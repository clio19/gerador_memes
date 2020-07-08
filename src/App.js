import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Meme from './components/Meme';

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};



function App() {

  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    axios.get('https://api.imgflip.com/get_memes')
      .then(response => {
        // console.log("templates ", response.data.data.memes);
        setTemplates(response.data.data.memes)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])
  if (meme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img style={{ width: 200 }} src={meme} alt="custom meme" />
      </div>
    );
  }

  return (
    <div className="App">
      {template && (
        <form
          onSubmit={async e => {
            e.preventDefault()
            // logica
            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: process.env.username, // put this on .env file
              password: process.env.password // put this on .env file
            };

            const response = await axios.get(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`)

            const json = await response.data;
            setMeme(json.data.url);
          }}
        >
          <Meme template={template} />
          <input
            placeholder="Texto Superior"
            value={topText}
            onChange={e => setTopText(e.target.value)}
          />
          <input
            placeholder="bottom text"
            value={bottomText}
            onChange={e => setBottomText(e.target.value)}
          />
          <button type="submit">create meme</button>
        </form>
      )}
      {!template && (
        <>
          <h1>Escolha uma Imagem</h1>
          {templates.map(template => {
            return (
              <Meme
                key={template.id}
                template={template}
                onClick={() => {
                  setTemplate(template)
                }}
              />
            )
          })}
        </>
      )}
    </div>
  );
}

export default App;
