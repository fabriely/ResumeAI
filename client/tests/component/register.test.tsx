import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormRegister from '../../src/components/formRegister';
import api from '../../src/services/api';


jest.mock('../../src/services/api');

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('FormRegister', () => {
test('deve permitir que o usuário preencha os campos do formulário', () => {
    render(<FormRegister />);

    const nameInput = screen.getByPlaceholderText('João');
    const lastNameInput = screen.getByPlaceholderText('Silva');
    const emailInput = screen.getByPlaceholderText('email@example.com');
    const passwordInput = document.querySelector('input#password') as HTMLInputElement;
    const confirmPasswordInput = document.querySelector('input#confirmPassword') as HTMLInputElement;
    const codeInput = screen.getByPlaceholderText('000000');

    fireEvent.change(nameInput, { target: { value: 'Carlos' } });
    fireEvent.change(lastNameInput, { target: { value: 'Santos' } });
    fireEvent.change(emailInput, { target: { value: 'carlos@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Senha123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Senha123!' } });
    fireEvent.change(codeInput, { target: { value: '123456' } });

    expect(nameInput).toHaveValue('Carlos');
    expect(lastNameInput).toHaveValue('Santos');
    expect(emailInput).toHaveValue('carlos@email.com');
    expect(passwordInput).toHaveValue('Senha123!');
    expect(confirmPasswordInput).toHaveValue('Senha123!');
    expect(codeInput).toHaveValue('123456');
});


test('deve exibir um erro se as senhas não coincidirem', async () => {
    render(<FormRegister />);

    const passwordInput = document.querySelector('input#password') as HTMLInputElement;
    const confirmPasswordInput = document.querySelector('input#confirmPassword') as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'Senha123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'SenhaErrada!' } });

    const registerButton = screen.getByText('Confirmar e Continuar');
    fireEvent.click(registerButton);

    const errorElement = await screen.findByText(/A Senha e a Confirmação de Senha precisam ser iguais/i);
    expect(errorElement).toBeInTheDocument();
});



test('deve chamar handleSendCode ao solicitar o código', async () => {
    (api.post as jest.Mock).mockResolvedValue({ status: 200 });

    render(<FormRegister />);

    const emailInput = screen.getByPlaceholderText('email@example.com');
    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });

    const sendCodeButton = screen.getByText('Receber Código');
    fireEvent.click(sendCodeButton);

    await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/users/sendcode', { email: 'teste@email.com' });
    });
});


test('deve bloquear o botão de registro se faltarem informações', () => {
    render(<FormRegister />);

    const registerButton = screen.getByText('Confirmar e Continuar');
    expect(registerButton).toBeDisabled();
});


test('deve alternar a visibilidade da senha', () => {
    const { container } = render(<FormRegister />);
    const passwordInput = container.querySelector('input#password') as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

        // Assume que o primeiro botão de toggle dentro de um container relativo é para o campo da senha
        const toggleButtons = container.querySelectorAll('div.relative button');
        const togglePasswordButton = toggleButtons[0];
        fireEvent.click(togglePasswordButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        fireEvent.click(togglePasswordButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
});

});