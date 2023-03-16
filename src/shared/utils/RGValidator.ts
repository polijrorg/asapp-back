function isRg(input: string): boolean {
  const digits = input.split('');
  const totals: number[] = [];
  let total = 0;
  let rest = 0;

  // Remove the verifier digit from RG
  const vd = digits.pop();

  // RG must have nine chars
  if (input.length !== 9) return false;

  // Multiplication calc with all digits except the last one
  digits.forEach((digit, index) => totals.push(Number(digit) * (2 + index)));

  // Sum calc with the results of multiplication
  totals.forEach((number) => { total += number; });

  rest = total % 11;

  if (vd === '0' && rest === 0) return true;
  if (vd === 'X' && rest === 1) return true;
  if (Number(vd) === 11 - rest) return true;

  return false;
}

export default isRg;
