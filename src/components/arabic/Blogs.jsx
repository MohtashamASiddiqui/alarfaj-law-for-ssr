import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet'; // Import Helmet
import logo from './images/logoBlueBack.jpg';

const RecordDetails = () => {
  const { urlCategory, url } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    // Fetch the record details based on the category and slug
    fetch(`https://www.arfajlaw.site/api/arabic/read/${urlCategory}/${url}`)
      .then((response) => response.json())
      .then((data) => setRecord(data))
      .catch((error) => console.error('Error fetching record details:', error));
  }, [urlCategory, url]);

  if (!record) {
    return <p>Loading...</p>;
  }

  const linkedin = () => {
    const baseUrl = 'https://arfajlaw.com/ar';
    const title = encodeURIComponent(record.url); // Encode the title
    const source = encodeURIComponent(record.title);

    // Construct the complete URL of the blog
    const blogUrl = `${baseUrl}/${record.urlCategory}/${record.url}`;

    // Encode the URL
    const url = encodeURIComponent(blogUrl);

    // Construct the LinkedIn sharing URL with the encoded URL, title, and source
    return `https://www.linkedin.com/shareArticle/?mini=true&url=${url}&title=${title}&source=${source}`;
  };

  const twitter = () => {
    const tweetText = `${record.title} - ${window.location.href}`;
    return `https://www.twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
  };

  return (
    <div className="news rtl">
      <Helmet>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://arfajlaw.com/${record.urlCategory}/${record.url}`}
        />
        <meta property="og:description" content={record.preview} />
        <meta property="og:title" content={record.title} />
        <meta property="og:image" content={record.file} />{' '}
        <title>{record.title}</title>
      </Helmet>

      <div className="news-main">
        <h2 className="news-title">{record.title}</h2>
        <div className="news-link">
          <div className="news-links1">
            {' '}
            {Array.isArray(record.person) && record.person.length > 0 && (
              <ul className="news-ul">
                {record.person.map(
                  (per, index) =>
                    per && (
                      <li key={index} className="news-li">
                        {per}
                      </li>
                    )
                )}
              </ul>
            )}
            <div className="news-link-con">
              <a href={linkedin()} className="news-icon news-icon-linkedin">
                <Icon icon="mdi-linkedin"></Icon>
              </a>
              <a href={twitter()} className="news-icon">
                <Icon icon="fa6-brands:square-x-twitter"></Icon>
              </a>
            </div>
          </div>
          <div className="news-link2">
            {/* <p>Category: {record.category}</p> */}
            <p> {record.date}</p>
          </div>
        </div>
        <div
          className="news-para news-para-ar"
          dangerouslySetInnerHTML={{ __html: record.description }}
        ></div>

        {/* Render download button if there's a file */}

        {record.file && (
          <button className="custom-button">
            <a
              className="news-file"
              href={`https://www.arfajlaw.site/${record.file}`}
              download
            >
              تحميل
            </a>{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordDetails;
