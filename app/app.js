import $ from 'jquery';
import Eye from './eye';
import utils from './utils';

class App {
  constructor() {
    this.video = $('#video');
    this.canvas = $('#canvas');
    this.context = $('#canvas')[0].getContext('2d');
    this.monster = $('#monster');
    this.tracker;
    this.eyes = [];

    // video
    this.video.attr('width', $(window).width() * 0.20);
    this.video.attr('height', $(window).width() * 0.20);
    this.canvas.attr('width', $(window).width() * 0.20);
    this.canvas.attr('height', $(window).width() * 0.20);

    this.trackerInit();
    this.eyesInit();
  };

  trackerInit() {
    this.tracker = new clm.tracker({useWebGL : true});
    this.tracker.init(pModel);
    this.tracker.start(this.video[0]);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
				window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

    var videoSelector = {video : true};
    navigator.getUserMedia(videoSelector, (stream) => {
      if (this.video[0].mozCaptureStream) {
					this.video[0].mozSrcObject = stream;
				} else {
					this.video[0].src = (window.URL && window.URL.createObjectURL(stream)) || stream;
				}
		},() => {
      return null;
    });

    this.video[0].play();
    this.tracker.start(this.video[0]);
    this.trackerListener();
  }

  trackerListener() {
    requestAnimationFrame(::this.trackerListener);
    this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
    var positions = this.tracker.getCurrentPosition();
    if (positions) {
      this.eyesUpdate(positions[62]);
      for (var i = 0; i < positions.length; i++) {
        this.context.beginPath();
        this.context.arc(positions[i][0], positions[i][1], 1, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'red';
        this.context.fill();
      }
    }
  };

  eyesInit() {
    let eyes = this.eyes;
    $('.eye').each(function(i) {
      var emptyEye = $(this).find('circle');
      if (emptyEye) {
        let rect = $(this).find('circle')[0].getBoundingClientRect();
        console.log(rect);
        let options = {
          r: (emptyEye.attr('r') * 0.40).toFixed(1),
          cx: emptyEye.attr('cx') - emptyEye.attr('r'),
          cy: emptyEye.attr('cy') - emptyEye.attr('r'),
          maxTranslate: (rect.width * 0.30).toFixed(1),
        }


        let eye = new Eye(options);
        let parent = $(this);
        eye.append(parent);
        eyes.push(eye);
      }
    });
  };

  eyesUpdate(position) {
    let width = this.canvas.width()
    let height = this.canvas.height();
    let cx = position[0];
    let cy = position[1];
    let px = (utils.normalize(0,width,cx)).toFixed(2);
    let py = (utils.normalize(0,height,cy)).toFixed(2);
    for (let eye of this.eyes) {
      let transform = {x:0,y:0};
      let calcx = Math.floor(eye.maxTranslate * px);
      transform.x = utils.reverseNumber(calcx,0,eye.maxTranslate);
      transform.y = Math.floor(eye.maxTranslate * py);
      eye.circle.attr('style',`transform:translate3d(${transform.x}px,${transform.y}px,0px);`);
    }
  }
};

export default App;
