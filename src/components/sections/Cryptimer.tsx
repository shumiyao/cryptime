import React, { ReactElement, useEffect, useContext, useCallback } from 'react';
import AppContext from '@/lib/AppContext';
import { useTranslation } from 'next-i18next';
import ProfilePhoto from 'src/assets/images/profiles/portrait.jpg';
import EasySpeech from 'easy-speech';
// https://www.npmjs.com/package/easy-speech

function Cryptimer(): ReactElement {
  const value = useContext(AppContext);
  const { parseMarkdown } = value;
  const { t } = useTranslation('home');

  useEffect(() => {
    EasySpeech.init({ maxTimeout: 5000, interval: 250 });
  }, []);

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    var voice = speechSynthesis.getVoices().find((voice) => {
      return voice.name === 'Kyoko';
    });
    const postData = async () => {
      //   const data = {
      //     title: title,
      //     post: post,
      //   };

      const response = await fetch('/api/price', {
        method: 'GET',
        // body: JSON.stringify(data),
      });
      return response.json();
    };
    postData().then(async (data) => {
      console.log(data);
      const price = Math.floor(data.price * 100) / 100;
      const percent_change_1h = Math.floor(data.percent_change_1h * 100) / 100;
      const percent_change_24h = Math.floor(data.percent_change_24h * 100) / 100;
      const percent_change_7d = Math.floor(data.percent_change_7d * 100) / 100;
      await EasySpeech.speak({
        text: `現在のビットコインの価格は、${String(price)} 米ドルです。直近の変動率は、1時間で約${percent_change_1h}％、1日で約${percent_change_24h}％、７日間で約${percent_change_7d}％ です。`,
        //   voice: false, // optional, will use a default or fallback
        voice,
        pitch: 1,
        rate: 1,
        volume: 1,
        // there are more events, see the API for supported events
        boundary: (e) => console.debug('boundary reached'),
      });
    });
  }, []);

  return (
    <section className='relative text-gray-500' id='our-mission-section'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-center'>
        <div className='container px-6 sm:px-0 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
          <div className='mt-10 mx-auto lg:w-full'>
            <h2 className='text-4xl my-10 text-gray-700' dangerouslySetInnerHTML={{ __html: parseMarkdown('Crypto + Timer a.k.a Cryptimer') }}></h2>
            <h3 className='text-xl my-10 text-gray-700' dangerouslySetInnerHTML={{ __html: parseMarkdown('まいど「クリプタ」です') }}></h3>
            <div className='py-9 space-y-6 text-base md:text-lg w-full ' dangerouslySetInnerHTML={{ __html: parseMarkdown('ビットコインの価格の音声照会をご希望の際は、ボタンを押してお知らせください。') }}></div>
            <button onClick={handleClick} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
              「クリプタ」してみる
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cryptimer;
