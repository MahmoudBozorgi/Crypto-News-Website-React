import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendCoinsRequest } from "../redux/modules/Coins";
import Loading from "./Loading";

const Cryptocurrencies = ({ count }) => {
  const { loading, data } = useSelector((state) => state.coinsReducer);

  const coins = data?.data?.coins;
  const dataCoins = data?.data?.coins.slice(0, 10);

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setCryptos(coins);

    const filteredData = coins?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [data, searchTerm]);

  useEffect(() => {
    dispatch(sendCoinsRequest());
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && coins && (
        <div>
          {!count ? (
            <div className="search-crypto">
              <Input
                placeholder="Search Cryptocurrency"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
          ) : null}

          <Row gutter={[32, 32]} className="crypto-card-container">
            {count
              ? dataCoins.map((currency) => (
                  <Col
                    xs={24}
                    sm={12}
                    lg={6}
                    className="crypto-card"
                    key={currency.uuid}
                  >
                    <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                      <Card
                        title={`${currency.rank}. ${currency.name}`}
                        extra={
                          <img
                            className="crypto-image"
                            src={currency.iconUrl}
                            alt="hi"
                          />
                        }
                        hoverable
                      >
                        <p>Price: {millify(currency.price)}</p>
                        <p>Market Cap: {millify(currency.marketCap)}</p>
                        <p>Daily Change: {currency.change}%</p>
                      </Card>
                    </Link>
                  </Col>
                ))
              : cryptos?.map((currency) => (
                  <Col
                    xs={24}
                    sm={12}
                    lg={6}
                    className="crypto-card"
                    key={currency.uuid}
                  >
                    <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                      <Card
                        title={`${currency.rank}. ${currency.name}`}
                        extra={
                          <img
                            className="crypto-image"
                            src={currency.iconUrl}
                            alt="hi"
                          />
                        }
                        hoverable
                      >
                        <p>Price: {millify(currency.price)}</p>
                        <p>Market Cap: {millify(currency.marketCap)}</p>
                        <p>Daily Change: {currency.change}%</p>
                      </Card>
                    </Link>
                  </Col>
                ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default Cryptocurrencies;
