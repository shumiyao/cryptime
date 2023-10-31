import React, { ReactElement, useEffect, useContext, useCallback, useState } from 'react';
import type { ChangeEvent } from 'react';
import AppContext from '@/lib/AppContext';
import { useTranslation } from 'next-i18next';
import ProfilePhoto from 'src/assets/images/profiles/portrait.jpg';
import EasySpeech from 'easy-speech';
import ReactFinalMarquee from 'react-final-marquee';

// https://www.npmjs.com/package/easy-speech

function Cryptimer(): ReactElement {
  //
  const value = useContext(AppContext);
  const [intervalNotch, setIntervalNotch] = useState('0');
  const [statusInfo, setStatusInfo] = useState('');

  var announcementInterval;
  const { parseMarkdown } = value;
  const { t } = useTranslation();
  const intervalStrings = {
    0: { label: t('once', { ns: 'home' }), durationMs: 0 },
    25: { label: t('5 minutes', { ns: 'home' }), durationMs: 300000 },
    50: { label: t('10 minutes', { ns: 'home' }), durationMs: 600000 },
    75: { label: t('30 minutes', { ns: 'home' }), durationMs: 1800000 },
    100: { label: t('60 minutes', { ns: 'home' }), durationMs: 3600000 },
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

    const increaseOrDecrease = (changePerce: number): string => (changePerce === 0 ? t('no-change',{ns:'messages'}) : changePerce > 0 ? t('increase',{ns:'messages'}) : t('decrease',{ns:'messages'}));

    const uiData = {
      notch: intervalStrings[intervalNotch].label,
    };
    const voice = speechSynthesis.getVoices().find((voice) => {
      return voice.name === t('voice',{ns:'messages'});
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
          interval: intervalStrings[intervalNotch].label,
        };

        execSpeak(replaceTranslationText(t('btcprice', { ns: 'messages' }), priceData));
        setStatusInfo(replaceTranslationText(t('btcpriceticker', { ns: 'messages' }), priceData));
      });
    setStatusInfo(t('loading', { ns: 'messages' }));
    if (intervalNotch === '0') {
      await execSpeak(replaceTranslationText(t('intro_once', { ns: 'messages' }), uiData));
      getDataThenSpeak();
    } else {
      await execSpeak(replaceTranslationText(t('intro', { ns: 'messages' }), uiData));
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
              <h2 className='text-4xl my-10 text-gray-700'>{t('Crypto + Timer a.k.a Cryptimer', { ns: 'home' })}</h2>
              <h3 className='text-xl my-10 text-gray-700'>{t('Welcome to Cryptime', { ns: 'home' })}</h3>
              <div className='py-9 space-y-6 text-base md:text-lg w-full'>{t('If you wish to inquire about the price of Bitcoin through voice, please choose a frequency interval, then click on the button to hear the current bitcoin price.', { ns: 'home' })}</div>
              <div className='py-9 space-y-6 text-base md:text-lg mx-64'>
                <ReactFinalMarquee className='marquee-customer-class' direction='rightToLeft' speed='30' space='240px' repeat='2'>
                  {statusInfo ? statusInfo : null}
                </ReactFinalMarquee>
              </div>
              <div className='flex justify-center items-center'>
                <div className='rounded-b-box rounded-tr-box flex min-h-[6rem] min-w-[18rem] max-w-4xl  items-center justify-center overflow-x-hidden border bg-cover bg-top p-4'>
                  <div className='w-full max-w-xs'>
                    <h3 className='text-md  text-gray-700'>{replaceTranslationText(intervalNotch !== '0' ? t('Every %%interval%%', { ns: 'home' }) : t('Only %%interval%%', { ns: 'home' }), { interval: intervalStrings[intervalNotch].label })}</h3>
                    <input type='range' min={0} max='100' defaultValue='0' className='range max-w-xs appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 ' step='25' onChange={handleNotchChange} />
                    <div className='w-full flex justify-between text-xs px-2 max-w-xs'>
                      <span>{t('Once', { ns: 'home' })}</span>
                      <span>{t('5 mins', { ns: 'home' })}</span>
                      <span>{t('10 mins', { ns: 'home' })}</span>
                      <span>{t('30 mins', { ns: 'home' })}</span>
                      <span>{t('60 mins', { ns: 'home' })}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-center items-center py-12'>
                <button onClick={handleClick} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                  {t('Tell me the current BTC price', { ns: 'home' })}
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
