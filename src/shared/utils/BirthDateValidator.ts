export default function validateBirthDate(birthDate: Date) {
  const hoje = new Date();
  const nasc = new Date(birthDate);
  const idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (idade >= 18) {
    if (idade === 18 && m > 0) return true;
    return true;
  }
  return false;
}
