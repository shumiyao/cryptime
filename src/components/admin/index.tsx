import CMS from '@staticcms/core';
import '@staticcms/core/dist/main.css';

// import UuidControl from './custom-widgets/UuidControl';
// import DataExchange from './custom-page/DataExchange';

import { useEffect } from 'react';

import CmsConfig from './config';

// import SystemConfig from '../../lib/config';

// import TestShortcode from './custom-shortcode/test'

// import type { TemplatePreviewProps } from '@staticcms/core';

import { faHouse, faTable, faStore, faTags, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// const PostPreview: FC<TemplatePreviewProps<PostData>> = ({ entry, widgetFor }) => {
//   return (
//     <div className='content'>
//       <h1>{entry.data.title}</h1>
//       <div>{entry.data.slug}</div>
//       <div>{entry.data.collection}</div>
//       <div>{entry.data.colors ? entry.data.colors.join(', ') : 'No colors'}</div>
//       <time>{entry.data.date}</time>
//       <div>{widgetFor('body')}</div>
//     </div>
//   );
// };

// const DataManagementPage = (e) => {
//   return (
//     <div>
//       <h2>Gestão de Dados</h2>
//     </div>
//   );
// };

const CMSPage = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      CmsConfig.local_backend = true;
    }

    // CMS.registerPreviewCard('members', MembersPreviewCard);

    // adding icons. see https://www.staticcms.org/docs/custom-icons
    CMS.registerIcon('house', () => <FontAwesomeIcon icon={faHouse} size='lg' />);
    CMS.registerIcon('table', () => <FontAwesomeIcon icon={faTable} size='lg' />);
    CMS.registerIcon('store', () => <FontAwesomeIcon icon={faStore} size='lg' />);
    CMS.registerIcon('tags', () => <FontAwesomeIcon icon={faTags} size='lg' />);
    CMS.registerIcon('screwdriver-wrench', () => <FontAwesomeIcon icon={faScrewdriverWrench} size='lg' />);

    // CMS.registerAdditionalLink({
    //   id: 'data-management-page',
    //   title: 'Gestão de Dados',
    //   data: DataExchange,
    //   options: {
    //     icon: 'table',
    //   },
    // });

    // CMS.registerWidget('uuid', UuidControl);

    // CMS.registerPreviewTemplate('productos', PostPreview);

    CMS.registerAdditionalLink({
      id: 'external-link',
      title: 'Miyao-Andrade Site',
      data: '/',
      options: {
        icon: 'house',
      },
    });

    CMS.init({ config: CmsConfig });
  }, []);

  return (
    <div>
      <style jsx global>{`
        html,
        body {
          height: 100%;
        }

        #__next {
          display: none;
        }

        .MuiTypography-root.MuiTypography-h5.MuiTypography-gutterBottom {
          font-size: 0;
          margin-bottom: 12px;
        }

        .MuiTypography-root.MuiTypography-h5.MuiTypography-gutterBottom:after {
          font-size: 22px;

          content: 'Admin Dashboard';
        }
      `}</style>
    </div>
  );
};

CMSPage.displayName = 'CMSPage';

export default CMSPage;
