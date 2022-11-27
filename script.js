/**
 * @author:Aravind PJ
 * 
 */

const dice = document.querySelector(".dice");

class qouteView {
  _data;
  _qoute = document.querySelector(".qoute--text");
  _id = document.querySelector(".id");
  render(data) {
    this._data = data;
    this._clear();
    this._updateQoute();
  }
  _clear() {
    this._qoute.textContent = "";
    this._id.textContent = "";
  }
  _updateQoute() {
    this._qoute.textContent = this._data.qoute;
    this._id.textContent = this._data.id;
  }
}
const view = new qouteView();

//////////////////////////////////////////////////////////////////////////////////////

const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const qouteGenerator = async function () {
  const data = await getJSON(`https://api.adviceslip.com/advice`);
  const { slip } = data;
  const qouteData = {
    id: slip.id,
    qoute: slip.advice,
  };
  
  console.log(qouteData.qoute);
  view.render(qouteData);
};

const init = function () {
  window.addEventListener("load", qouteGenerator);

  dice.addEventListener("click", function () {
    qouteGenerator();
  });
};
init()