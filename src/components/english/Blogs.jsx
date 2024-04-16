import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import Helmet
import { Icon } from '@iconify/react';
import style from './blogs.css';
import logo from './images/logoBlueBack.jpg';

const RecordDetails = () => {
  const { category, slug } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const fetchRecordDetails = async () => {
      try {
        const response = await fetch(
          `https://www.arfajlaw.site/api/read/${category}/${slug}`
        );
        const data = await response.json();
        setRecord(data);
      } catch (error) {
        console.error('Error fetching record details:', error);
      }
    };

    fetchRecordDetails();

    // Clean-up function
    return () => {
      // Any clean-up code can go here
    };
  }, [category, slug]);

  if (!record) {
    return <p>Loading...</p>;
  }

  const linkedin = () => {
    const baseUrl = 'https://arfajlaw.com';
    const title = encodeURIComponent(record.title);
    const url = encodeURIComponent(`${baseUrl}/${category}/${slug}`);

    return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;
  };

  const twitter = () => {
    const tweetText = `${record.title} - ${window.location.href}`;
    return `https://www.twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
  };

  return (
    <div className="news">
      <Helmet>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://arfajlaw.com/${record.category}/${record.slug}`}
        />
        <meta property="og:title" content={record.title} />
        <meta property="og:description" content={record.title} />{' '}
        <meta property="og:image" content={record.file} />{' '}
        <title>{record.title}</title>
      </Helmet>

      <div className="news-main">
        <h2 className="news-title">{record.title}</h2>
        <div className="news-link">
          <div className="news-links1">
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
            <p> {record.date}</p>
          </div>
        </div>
        <div
          className="news-para"
          dangerouslySetInnerHTML={{ __html: record.sanitizedHtml }}
        ></div>

        {record.file && (
          <button className="custom-button">
            <a
              className="news-file"
              href={`https://www.arfajlaw.site/${record.file}`}
              download
            >
              Download
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordDetails;
