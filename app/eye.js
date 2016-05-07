import $ from 'jquery';

class Eye {
    constructor(options) {
        this.r = options.r;
        this.cx = options.cx;
        this.cy = options.cy;
        this.maxTranslate = options.maxTranslate;
        this.color = '#1f4216';
        this.circle;
    };

    append(parent) {
      let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
      this.circle = $(circle);
      this.circle.attr('fill',this.color);
      this.circle.attr('cx',this.cx);
      this.circle.attr('cy',this.cy);
      this.circle.attr('r',this.r);
      $(parent).append(circle);
    };

    move() {
      this.circle.attr('cx',this.cx);
      this.circle.attr('cy',this.cy);
    };
};

export default Eye;
