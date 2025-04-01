import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from '../../src/components/modalLogin';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

test('deve exibir erros ao tentar logar sem preencher os campos', () => {
  render(<LoginModal onClose={() => {}} />);

  const botao = screen.getByRole('button', { name: /Login/i });
  fireEvent.click(botao);

  expect(screen.getByText(/Insira um email válido/i)).toBeInTheDocument();
  expect(screen.getByText(/Insira sua senha/i)).toBeInTheDocument();
});
