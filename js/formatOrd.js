const BHO = new Decimal("48630661836227715204")
function numToPsi(num){
  let gwa = options.gwaOrdinal
  return displayPsiOrd(num, player.maxLength)
}
function numToOP(num, base, iter=0){
  if (base.lte(iter))return 0
  num = num.floor().max(0)
  if (num.eq(0)&&iter==0)return 0
  let n = new Decimal(0)
  if (num.lt(base.sqr())&&iter==0){
    return new Decimal(0)
  } else if (num.lt(base)){
    return num
  } else {
    let exponent = num.log(base).floor()
    let s = numToOP(exponent, base, 1)
    let coef = num.div(base.pow(exponent).round()).floor()
    let rem = num.sub(base.pow(exponent).round().mul(coef)).round()
    n=n.add(Decimal.pow(inAnyChallenge("r")?12:hasUpgrade("h",112)?60:[12,15,20,30][player.b.challenges[11]], s).mul(coef))
    if (rem.lt(base)){n=n.add(rem)} else {
    n=n.add(numToOP(rem, base, iter+1))}
    return n
  }
}
function hierarchyOrd(num, base, iter=0) {
  if (base.lte(iter))return 0
  num = num.floor().max(0)
  if (num.eq(0)&&iter==0)return 0
  let n = new Decimal(0)
  if (num.lt(base.sqr())&&iter==0){
    return new Decimal(0)
  } else if (num.lt(base)){
    return num
  } else {
    let exponent = num.log(base).floor()
    let s = hierarchyOrd(exponent, base, 1)
    let coef = num.div(base.pow(exponent).round()).floor()
    let rem = num.sub(base.pow(exponent).round().mul(coef)).round()
    n=n.add(Decimal.pow(10, s).mul(coef))
    if (rem.lt(base)){n=n.add(rem)} else {
    n=n.add(hierarchyOrd(rem, base, iter+1))}
    return n
  }
}
function displayPsiOrd(ord, trim) {
  // ord is a Decimal
  ord = ord.floor();

  // base cases
  if (ord.eq(0)) return "";
  if (trim <= 0) return "...";

  // ord < 4  → we need a small integer index for extraOrdMarks
  if (ord.lt(4)) return extraOrdMarks[ord.toNumber()];

  // magnitude = floor( log_3( floor(ord / 4) ) )
  const magnitude = ord
    .div(4)
    .floor()
    .log(3)      // Decimal.log with base 3, like you already use .log(2) elsewhere
    .floor();

  // magnitudeAmount = 4 * 3^magnitude
  const magnitudeAmount = Decimal.pow(3, magnitude).mul(4);

  // ordMarks index is tiny compared to ord itself, so Number is safe here
  const magIndex = Math.min(magnitude.toNumber(), ordMarks.length - 1);
  let finalOutput = ordMarks[magIndex];

  // Recurse with ordinals still as Decimals
  if (finalOutput.includes("x")) {
    finalOutput = finalOutput.replace(
      /x/,
      displayPsiOrd(ord.sub(magnitudeAmount), trim - 1)
    );
  }
  if (finalOutput.includes("y")) {
    finalOutput = finalOutput.replace(
      /y/,
      displayPsiOrd(ord.sub(magnitudeAmount).add(1), trim - 1)
    );
  }

  if (options.gwaOrdinal) {
    finalOutput = finalOutput
      .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
      .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
      .replaceAll("&psi;","<img src='https://cdn.discordapp.com/emojis/929933686353297479.webp?size=24'>");
  }

  return `${finalOutput}`.replaceAll(
    "undefined",
    options.gwaOrdinal?"<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>":"ω");
}
const ordMarks = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>2</sup>x)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub>x)",
    "&psi;(Ω<sub>2</sub>Ωx)",
    "&psi;(Ω<sub>2</sub>Ω<sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub>Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ωx)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>y</sup>",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ωx)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ωx)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ωx)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ωx)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>y</sup>)",
"&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ωx)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ωx)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>Ω<sup>Ω<sup>y</sup></sup>)",




]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]
