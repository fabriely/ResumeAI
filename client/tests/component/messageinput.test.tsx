import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from '../../src/components/chatbotScreen/MessageInput';

describe('MessageInput', () => {
  let setMessage: jest.Mock;
  let handleKeyPress: jest.Mock;
  let handleSendMessage: jest.Mock;
  let handleSendFile: jest.Mock;
  let activeFile: number | null;
  let files: { name: string; id: number }[];

  beforeEach(() => {
    setMessage = jest.fn();
    handleKeyPress = jest.fn();
    handleSendMessage = jest.fn();
    handleSendFile = jest.fn();
    activeFile = null;
    files = [];
  });

  test('deve permitir que o usuário digite uma mensagem', () => {
    render(
      <MessageInput
        message=""
        setMessage={setMessage}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
        handleSendFile={handleSendFile}
        activeFile={activeFile}
        files={files}
      />
    );

    const textarea = screen.getByPlaceholderText('Digite sua mensagem...');
    fireEvent.change(textarea, { target: { value: 'Olá, teste!' } });

    expect(setMessage).toHaveBeenCalledWith('Olá, teste!');
  });

  test('deve exibir erro ao tentar enviar mensagem vazia', () => {
    render(
      <MessageInput
        message=""
        setMessage={setMessage}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
        handleSendFile={handleSendFile}
        activeFile={activeFile}
        files={files}
      />
    );

    const sendButton = screen.getByRole('button');
    fireEvent.click(sendButton);

    expect(screen.getByText(/Por favor, digite uma mensagem ou envie um arquivo/i)).toBeInTheDocument();
  });

  test('deve chamar handleSendMessage ao enviar uma mensagem válida', () => {
    render(
      <MessageInput
        message="Teste de mensagem"
        setMessage={setMessage}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
        handleSendFile={handleSendFile}
        activeFile={activeFile}
        files={files}
      />
    );

    const sendButton = screen.getByRole('button');
    fireEvent.click(sendButton);

    expect(handleSendMessage).toHaveBeenCalledTimes(1);
  });

  test('deve chamar handleSendFile quando a mensagem está vazia', () => {
    render(
      <MessageInput
        message=""
        setMessage={setMessage}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
        handleSendFile={handleSendFile}
        activeFile={activeFile}
        files={files}
      />
    );

    const sendButton = screen.getByRole('button');
    fireEvent.click(sendButton);

    expect(handleSendFile).toHaveBeenCalledTimes(1);
  });
});
