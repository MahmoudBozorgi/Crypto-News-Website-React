import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendNewsAPIRequest } from "../redux/modules/News";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import Loading from "./Loading";
import { sendCoinsRequest } from "../redux/modules/Coins";

import ".";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ count }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { loading, data } = useSelector((state) => state.newsApiReducer);
  const { data: cryptoData } = useSelector((state) => state.coinsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendNewsAPIRequest(newsCategory));
    dispatch(sendCoinsRequest());
  }, [newsCategory]);

  const coinsList = cryptoData?.data?.coins;
  const dataNews = data?.value?.slice(0, count);

  return (
    <>
      {loading && <Loading />}
      {!loading && data.value && (
        <Row gutter={[24, 24]}>
          {!count ? (
            <Col span={24}>
              <Select
                showSearch
                className="select-news"
                placeholder="Select a Crypto"
                optionFilterProp="children"
                value={newsCategory}
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Cryptocurency">Cryptocurrency</Option>
                {coinsList?.map((currency, index) => (
                  <Option value={currency.name} key={index}>
                    {currency.name}
                  </Option>
                ))}
              </Select>
            </Col>
          ) : null}

          {count
            ? dataNews.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                  <Card hoverable className="news-card">
                    <a href={news.url} target="_blank" rel="noreferrer">
                      <div className="news-image-container">
                        <Title className="news-title" level={4}>
                          {news.name}
                        </Title>
                        <img
                          src={news?.image?.thumbnail?.contentUrl || demoImage}
                          alt=""
                        />
                      </div>
                      <p>
                        {news.description.length > 100
                          ? `${news.description.substring(0, 100)}...`
                          : news.description}
                      </p>
                      <div className="provider-container">
                        <div>
                          <Avatar
                            src={
                              news.provider[0]?.image?.thumbnail?.contentUrl ||
                              demoImage
                            }
                            alt=""
                          />
                          <Text className="provider-name">
                            {news.provider[0]?.name}
                          </Text>
                        </div>
                        <Text>
                          {moment(news.datePublished).startOf("ss").fromNow()}
                        </Text>
                      </div>
                    </a>
                  </Card>
                </Col>
              ))
            : data.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                  <Card hoverable className="news-card">
                    <a href={news.url} target="_blank" rel="noreferrer">
                      <div className="news-image-container">
                        <Title className="news-title" level={4}>
                          {news.name}
                        </Title>
                        <img
                          src={news?.image?.thumbnail?.contentUrl || demoImage}
                          alt=""
                        />
                      </div>
                      <p>
                        {news.description.length > 100
                          ? `${news.description.substring(0, 100)}...`
                          : news.description}
                      </p>
                      <div className="provider-container">
                        <div>
                          <Avatar
                            src={
                              news.provider[0]?.image?.thumbnail?.contentUrl ||
                              demoImage
                            }
                            alt=""
                          />
                          <Text className="provider-name">
                            {news.provider[0]?.name}
                          </Text>
                        </div>
                        <Text>
                          {moment(news.datePublished).startOf("ss").fromNow()}
                        </Text>
                      </div>
                    </a>
                  </Card>
                </Col>
              ))}
        </Row>
      )}
    </>
  );
};

export default News;
