export default {
  /* eslint-disable no-param-reassign */
  moveScroll(start, end, dom, prop) {
    let dis = 0;
    const speed = end < 0 ? -5 : 5;
    const t = setInterval(() => {
      dis += speed;
      dom[prop] = start + dis;
      if (Math.abs(dis) >= Math.abs(end)) {
        dom[prop] = start + end;
        clearInterval(t);
      }
    }, 2);
  },
};
