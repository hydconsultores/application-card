/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Layout, Modal, Button, BackTop } from "antd";
import { BrowserRouter } from "react-router-dom";

// import CMSTemplate from "../../components/CMSTemplate";
import Routes from "../routes/routes";

const { Content } = Layout;

export default function LayoutApp() {
  const [count, setCount] = useState(0);
  const [token, ] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (token === null) return;
    const tkn = document.getElementById("tkn") as any;
    if (tkn !== null) {
      tkn.value = token;
    }
    setLoading(true);
  }, [token]);

  useEffect(() => {
    if (count >= 5) {
      setVisible(true);
      setCount(0);
    }
  }, [count]);

  return (
    <BrowserRouter>
      <Layout className="layout">
        {!loading ? (
          <div>
            <Content>
              <div className="site-layout-content">
                 <Routes />
              </div>
            </Content>
          </div>
        ) : (
            <div
              id="imgLoading"
              style={{
                width: 150,
                height: 150,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -75,
                marginTop: -75,
              }}
            >
              <img
                src=""
                alt="Cargando..."
              />
            </div>
          )}
      </Layout>

      { /* 
      <a href="">
        <img 
          className="icon-fixed-left"
          alt="Whatsapp"
          src="https://img.icons8.com/color/452/whatsapp--v1.png"
        />
      </a>
      <a href="">
        <img 
          className="icon-fixed-left"
          src={require("../assets/images/whatsapp-chatbot.png")} />
      </a>
      */ }

      <Modal
        visible={visible}
        onCancel={() => {
          setCount(0);
          setVisible(false);
        }}
        onOk={() => {
          setCount(0);
          setVisible(false);
        }}
        style={{ top: 0 }}
        width={350}
        footer={[
          <Button
            type="primary"
            onClick={() => {
              setCount(0);
              setVisible(false);
            }}
          ></Button>,
        ]}
      >
        <div className="center-flex" style={{ width: 300 }}>
          <img
            src="f"
            width="300"
            alt=""
          />
        </div>
      </Modal>
      <BackTop />
    </BrowserRouter>
  );
}
