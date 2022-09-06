# TODO

## Bugs/Maintenance

- [ ] Fix mildot math ([reference](https://skillatarms.com/mil-dot-formula-calculator-ranging-and-measuring-made-easy/))
- [ ] Husky/Prettier pre-push ([reference](https://typicode.github.io/husky/#/?id=automatic-recommended))
- [ ] Implement Jest tests & snapshots
  - [ ] Update hooks & to run tests
- [ ] Replace getLocalizedStringByKey w/ translate built-in methods
  - [ ] Localize unlocalized text
- [ ] Migrate to `navigator.userAgentData`
- [ ] Use [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to load resources (fonts, sounds)
- [ ] Use [HTML5 dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) for modal
- [ ] Generate last update date for `humans.txt`

## Features

### Big

- [ ] [MOA reticle calculator](https://skillatarms.com/moa-reticle-formula-ranging-made-easy/)
- [ ] [Max PBR calculator](http://www.shooterscalculator.com/point-blank-range.php)
- [ ] [Hold over tables calculator](http://www.shooterscalculator.com/ballistic-trajectory-chart.php?pl=5.56+LC+M855&presets=&df=G7&bc=0.304&bw=62&vi=2850&zr=100&sh=2.5&sa=0&ws=0&wa=0&cr=500&ss=25&chartColumns=Range~yd%3BElevation~in%3BEnergy~ft.lbf%3BVel%5Bx%2By%5D~ft%2Fs&lbl=5.56+Lake+City+M855&submitst=+Create+Chart+)

### Little

- [ ] "Share" modal & menu item w/ QR code, link to szpi.la/apps
- [ ] Looks like you're using this on a phone..." pop-up when visiting via mobile web (ok, nope, never ask me again options (saved))
- [x] Actual navburger (controlled via setting) *1.3.2*
- [ ] Implement point of aim vs point of impact modal & trigger w/ illustration
- [ ] Dismissable infoblocks w/ saved state
- [ ] Multiple themes
- [ ] Rifle configs
- [ ] Shot timer (need to port to react-native for iOS compat)
