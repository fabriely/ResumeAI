'use client';

import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import api from "../../services/api";
import { ClipboardCopy, Trash, Calendar, Download } from "lucide-react";
import { useSession } from "next-auth/react";
import Header from "components/chatbotScreen/Header";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

interface Summary {
  id: number;
  content: string; 
  user_email: string;
}

interface ParsedContent {
  file_name: string;
  summary_content: string;
  created_at: string;
}

const PDFApp = dynamic(() => import("components/pdfCreator").then(mod => mod.App), { ssr: false });

export default function MeusDocumentos() {
  const { data: session } = useSession();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) {
      router.replace('/chatbot'); // Redireciona usando o router do Next.js
      return;
    }

    api.get(`/users/${session.user.email}/summaries/`)
      .then(response => {
        setSummaries(response.data.summaries);
        console.log(response.data);
      })
      .catch(error => console.error("Erro ao buscar resumos", error));
  }, [session, router]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Resumo copiado para a área de transferência!");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este resumo?")) {
      try {
        if (session?.user?.email) {
          console.log(id);
          await api.delete(`/users/${session.user.email}/summaries/${id}`);
          setSummaries(prev => prev.filter(summary => summary.id !== id));
        }
      } catch (error) {
        console.error("Erro ao excluir resumo", error);
      }
    }
  };

  const handleDownload = async (id: number, summaryContent: string) => {
    if (session?.user?.email) {
      console.log(id);
      // Open a new window and render the PDFViewer with MyDocument
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write('<div id="pdf-root"></div>');
        newWindow.document.close();
        const pdfRoot = newWindow.document.getElementById('pdf-root');
        if (pdfRoot) {
          const root = createRoot(pdfRoot);
          root.render(<PDFApp id={id} summaryContent={summaryContent} />);
        } else {
          console.error("Não foi possível encontrar o arquivo desejado.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-6 py-12 pt-24"> {/* pt-24 para evitar sobreposição do Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Meus Documentos
        </h1>

        {summaries.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            Nenhum resumo salvo ainda. 
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map(({ id, content }) => {
              const parsedContent: ParsedContent = JSON.parse(content);

              return (
                <Card
                  key={id}
                  className="flex-1 shadow-lg border border-gray-200 bg-white rounded-xl hover:shadow-xl transition duration-300 flex flex-col"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {parsedContent.file_name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> {new Date(parsedContent.created_at).toLocaleString()}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    <p className="text-gray-700 line-clamp-3 text-sm">
                      {parsedContent.summary_content}
                    </p>
                  </CardContent>
                  <div className="mt-4 flex justify-between pt-4 pb-2 pl-4 pr-4">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleCopy(parsedContent.summary_content)}
                        size="sm"
                        className="bg-[#007aff] text-white hover:bg-blue-700 transition rounded-full"
                      >
                        <ClipboardCopy className="w-4 h-4 mr-2" /> Copiar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#007aff] text-white hover:bg-blue-700 transition rounded-full p-2"
                        onClick={() => handleDownload(id, parsedContent.summary_content)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleDelete(id)}
                      variant="destructive"
                      size="sm"
                      className="bg-[#ff2d55] text-white hover:bg-red-700 transition rounded-full p-2"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 
