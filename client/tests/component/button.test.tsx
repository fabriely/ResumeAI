import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../src/components/ui/button';

test('deve renderizar um botão com o texto correto', () => {
  render(<Button>Salvar</Button>);
  expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
});

test('deve chamar a função ao clicar no botão', async () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Salvar</Button>);

  await userEvent.click(screen.getByRole('button', { name: /salvar/i }));
  expect(onClick).toHaveBeenCalledTimes(1);
});
