/* 조건 평가. 배열은 AND. 지원: stageMin stageMax has solved flag deduced ended notEnded scene talked not any all */
(function () {
  const EF = window.EF;
  EF.check = function check(cond, s = EF.state) {
    if (cond === undefined || cond === null) return true;
    if (Array.isArray(cond)) return cond.every(c => check(c, s));
    return Object.keys(cond).every(k => {
      const v = cond[k];
      switch (k) {
        case 'stageMin': return EF.getStage(s) >= v;
        case 'stageMax': return EF.getStage(s) <= v;
        case 'has': return !!s.evidence[v];
        case 'solved': return !!s.solved[v];
        case 'flag': return !!s.flags[v];
        case 'deduced': return !!s.deduced[v];
        case 'ended': return EF.getStage(s) === 5;
        case 'notEnded': return EF.getStage(s) !== 5;
        case 'scene': return s.scene === v;            // 지금 이 장면에 있을 때 (같은 인물을 장소마다 다르게)
        case 'talked': return !!(s.talks && s.talks[v]); // 이 인물과 이미 말해 본 적이 있을 때
        case 'not': return !check(v, s);
        case 'any': return v.some(c => check(c, s));
        case 'all': return v.every(c => check(c, s));
        default: console.warn('알 수 없는 조건', k); return false;
      }
    });
  };
})();
