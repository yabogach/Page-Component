var Device, Screen, buttons, i, j, page, pageContent, pagination, screenObject;

Device = new Layer({
  image: "http://resources.framerjs.com/static/DeviceResources/apple-iphone-6s-space-gray.png",
  width: 874,
  height: 1792
});
screenObject = Screen;
Screen = new Layer({
  width: 750,
  height: 1334,
  backgroundColor: "black",
  parent: Device,
  clip: true,
  x: Align.center(),
  y: Align.center()
});
(window.onresize = function() {
  Device.scale = screenObject.height / (Device.height + 50);
  return Device.center();
})();

page = new PageComponent({
  parent: Screen,
  width: Screen.width,
  height: Screen.height - 100,
  scrollVertical: false
});

buttons = [];

pageContent = [];

pagination = new Layer({
  height: 100,
  parent: Screen,
  y: Align.bottom,
  x: Align.center,
  backgroundColor: "black"
});

for (i = j = 0; j < 5; i = ++j) {
  pageContent[i] = new Layer({
    width: page.width,
    height: page.height,
    parent: page.content,
    backgroundColor: Utils.randomColor(),
    x: page.width * i,
    image: Utils.randomImage()
  });
  buttons[i] = new Layer({
    backgroundColor: "white",
    width: 15,
    height: 15,
    x: i * 40 + 10,
    parent: pagination,
    y: Align.center,
    borderRadius: "50%",
    opacity: .6
  });
  buttons[i].states.onButton = {
    opacity: 1,
    scale: 1.5,
    animationOptions: {
      curve: "spring(250,5,0)"
    }
  };
  buttons[i].states.offButton = {
    opacity: 0.5,
    scale: 1,
    animationOptions: {
      curve: "spring(250,5,0)"
    }
  };
}

buttons[0].stateSwitch("onButton");

page.onChange('currentPage', function() {
  var button, k, l, layer, len, len1, results, x;
  x = 0;
  for (i = k = 0, len = pageContent.length; k < len; i = ++k) {
    layer = pageContent[i];
    if (page.currentPage === layer) {
      x = i;
    }
  }
  buttons[x].animate("onButton");
  results = [];
  for (l = 0, len1 = buttons.length; l < len1; l++) {
    button = buttons[l];
    if (button.states.current.name = "onButton" && button !== buttons[x]) {
      results.push(button.animate("offButton"));
    } else {
      results.push(void 0);
    }
  }
  return results;
});

page.animationOptions = {
  curve: "bezier-curve(0.5, 1, 0.5, 1)",
  time: 0.3
};
