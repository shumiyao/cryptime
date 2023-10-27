import React, { ReactElement, useEffect, useContext, useCallback, useState } from 'react';
import type { ChangeEvent } from 'react';
import AppContext from '@/lib/AppContext';
import { useTranslation } from 'next-i18next';
import ProfilePhoto from 'src/assets/images/profiles/portrait.jpg';
import EasySpeech from 'easy-speech';
import ReactFinalMarquee from 'react-final-marquee';

// https://www.npmjs.com/package/easy-speech

function Cryptimer(): ReactElement {
  // spoken messages
  const messages = {
    intro: `ご案内致します。。。毎度、クリプタをご利用いただき、誠にありがとうございます。ビットコインの米ドル価格を、、%%notch%%、、間隔でお知らせ致します。`,
    intro_once: `ご案内致します。。。毎度、クリプタをご利用いただき、誠にありがとうございます。ビットコインの米ドル価格をお知らせ致します。`,
    btcprice: '現在のビットコインの価格は、%%price%% 米ドルです。直近の変動率は、1時間で、約、%%percent_change_1h%%％の%%increaseOrDecrease_percent_change_1h%%、、、、1日で、約、%%percent_change_24h%%％の%%increaseOrDecrease_percent_change_24h%%、、、、７日間で、約、%%percent_change_7d%%％の%%increaseOrDecrease_percent_change_7d%%です。',
    btcpriceticker: '　　　　　　　　　　　　　　⭐️ 現在のビットコインの価格は、%%price%% 米ドルです。直近の変動率は、1時間で約%%percent_change_1h%%％の%%increaseOrDecrease_percent_change_1h%%。1日で約%%percent_change_24h%%％の%%increaseOrDecrease_percent_change_24h%%。７日間で約%%percent_change_7d%%％の%%increaseOrDecrease_percent_change_7d%%です。',
    loading: 'データを取得中です。しばらくお待ちください。',
    error: 'エラーが発生しました。'
  };
  //
  const value = useContext(AppContext);
  const [intervalNotch, setIntervalNotch] = useState('0');
  const [statusInfo, setStatusInfo] = useState('');

  var announcementInterval;
  const { parseMarkdown } = value;
  const { t } = useTranslation('home');
  const intervalStrings = {
    0: { label: '一回', durationMs: 0 },
    25: { label: '5分', durationMs: 300000 },
    50: { label: '10分', durationMs: 600000 },
    75: { label: '30分', durationMs: 1800000 },
    100: { label: '60分', durationMs: 3600000 },
  };

  useEffect(() => {
    EasySpeech.init({ maxTimeout: 5000, interval: 250 });
  }, []);

  const handleNotchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntervalNotch(e.target.value);
    console.log('value is:', intervalStrings[e.target.value]);
  };

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // const a = EasySpeech.status();
    if (announcementInterval) {
      clearInterval(announcementInterval);
    }
    const execSpeak = async (text: string) => {
      await EasySpeech.speak({
        text,
        //   voice: false, // optional, will use a default or fallback
        voice,
        pitch: 1,
        rate: 1,
        volume: 1,
        // there are more events, see the API for supported events
        boundary: (e) => console.debug('boundary reached'),
      });
    };
    /**
     * Replace translation strings
     * @param text string variables corresponds to key wrapped with %%. E.g. %%time%%, %%price%% ...
     * @param variables {[string]:string}
     */
    const replaceTranslationText = (text: string = '', variables: { [key: string]: string } = {}): string => {
      Object.keys(variables).forEach((key: string) => {
        text = text.replaceAll(`%%${key}%%`, variables[key]);
      });
      return text;
    };
    const increaseOrDecrease = (changePerce: number): string => (changePerce === 0 ? '変化無し' : changePerce > 0 ? '増加' : '減少');

    const uiData = {
      notch: intervalStrings[intervalNotch].label,
    };
    const voice = speechSynthesis.getVoices().find((voice) => {
      return voice.name === 'Kyoko';
    });
    const postData = async () => {
      //   const data = {
      //     title: title,
      //     post: post,
      //   };
      setStatusInfo('');
      const response = await fetch('/api/price', {
        method: 'GET',
        // body: JSON.stringify(data),
      });
      return response.json();
    };

    const getDataThenSpeak = () =>
      postData().then(async (data) => {
        console.log(data);
        const price = Math.floor(data.price * 100) / 100;
        const percent_change_1h = Math.floor(data.percent_change_1h * 100) / 100;
        const percent_change_24h = Math.floor(data.percent_change_24h * 100) / 100;
        const percent_change_7d = Math.floor(data.percent_change_7d * 100) / 100;

        const priceData = {
          price: String(price),
          percent_change_1h: String(percent_change_1h),
          increaseOrDecrease_percent_change_1h: increaseOrDecrease(percent_change_1h),
          percent_change_24h: String(percent_change_24h),
          increaseOrDecrease_percent_change_24h: increaseOrDecrease(percent_change_24h),
          percent_change_7d: String(percent_change_7d),
          increaseOrDecrease_percent_change_7d: increaseOrDecrease(percent_change_7d),
        };

        execSpeak(replaceTranslationText(messages.btcprice, priceData));
        setStatusInfo(replaceTranslationText(messages.btcpriceticker, priceData));
      });
      setStatusInfo(messages.loading);
    if (intervalNotch === '0') {
      await execSpeak(replaceTranslationText(messages.intro_once, uiData));
      getDataThenSpeak();
    } else {
      await execSpeak(replaceTranslationText(messages.intro, uiData));
      getDataThenSpeak();
      announcementInterval = setInterval(() => getDataThenSpeak(), intervalStrings[intervalNotch].durationMs);
    }
  };

  return (
    <>
      <section className='relative text-gray-500' id='our-mission-section'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-center'>
          <div className='container px-6 sm:px-0 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
            <div className='mt-10 mx-auto lg:w-full'>
              <h2 className='text-4xl my-10 text-gray-700' dangerouslySetInnerHTML={{ __html: parseMarkdown('Crypto + Timer a.k.a Cryptimer') }}></h2>
              <h3 className='text-xl my-10 text-gray-700' dangerouslySetInnerHTML={{ __html: parseMarkdown('まいど「クリプタ」です') }}></h3>
              <div className='py-9 space-y-6 text-base md:text-lg w-full ' dangerouslySetInnerHTML={{ __html: parseMarkdown('ビットコインの価格の音声照会をご希望の際は、ボタンを押してお知らせください。') }}></div>
              <div className='py-9 space-y-6 text-base md:text-lg mx-64'>
                <ReactFinalMarquee className='marquee-customer-class' direction='rightToLeft' speed='30' space='240px' repeat='2'>
                  {statusInfo ? statusInfo : null}
                </ReactFinalMarquee>
              </div>
              <div className='flex justify-center items-center'>
                <div className='rounded-b-box rounded-tr-box flex min-h-[6rem] min-w-[18rem] max-w-4xl  items-center justify-center overflow-x-hidden border bg-cover bg-top p-4'>
                  <div className='w-full max-w-xs'>
                    <h3 className='text-md  text-gray-700' dangerouslySetInnerHTML={{ __html: intervalStrings[intervalNotch].label + (intervalNotch !== '0' ? t('間隔') : 'のみ') }}></h3>
                    <input type='range' min={0} max='100' defaultValue='0' className='range max-w-xs appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 ' step='25' onChange={handleNotchChange} />
                    <div className='w-full flex justify-between text-xs px-2 max-w-xs'>
                      <span>{t('一回')}</span>
                      <span>{t('5分')}</span>
                      <span>{t('10分')}</span>
                      <span>{t('30分')}</span>
                      <span>{t('60分')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-center items-center py-12'>
                <button onClick={handleClick} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                  「クリプタ」してみる
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .range {
          height: 1.5rem;
          width: 100%;
          cursor: pointer;
          -moz-appearance: none;
          appearance: none;
          -webkit-appearance: none;
          --range-shdw: var(--bc);
          overflow: hidden;
          background-color: transparent;
          border-radius: var(--rounded-box, 1rem);
        }
      `}</style>
    </>
  );
}

export default Cryptimer;
