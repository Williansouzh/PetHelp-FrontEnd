export function calcularIdade(birthDate: string | Date): number {
  if (!birthDate) return 0;

  const nascimento = new Date(birthDate).getTime();
  if (isNaN(nascimento)) return 0;

  const agora = Date.now();

  const idade = Math.floor(
    (agora - nascimento) / (1000 * 60 * 60 * 24 * 365.25)
  );

  return idade >= 0 ? idade : 0;
}
