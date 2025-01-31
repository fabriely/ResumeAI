'use client';

import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import api from "../../services/api";
import { ClipboardCopy, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Header from "components/tela_chatbot/Header";

interface Summary {
  id: number;
  content: string; // JSON em string
  user_email: string;
}

interface ParsedContent {
  file_name: string;
  summary_content: string;
  created_at: string;
}

export default function MeusDocumentos() {
  const { data: session } = useSession();
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      api.get(`/users/${session.user.email}/summaries/`)
        .then(response => {
          setSummaries(response.data.summaries);
          console.log(response.data);
        })
        .catch(error => console.error("Erro ao buscar resumos", error));
    }
  }, [session]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Resumo copiado para a área de transferência!");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este resumo?")) {
      try {
        if (session?.user?.email) {
          await api.delete(`/users/${session.user.email}/summaries/${id}`);
          setSummaries(prev => prev.filter(summary => summary.id !== id));
        }
      } catch (error) {
        console.error("Erro ao excluir resumo", error);
      }
    }
  };

  return (   
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-6 py-12 pt-24"> 
        {/* pt-24 para evitar sobreposição do Header */}

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📂 Meus Documentos
        </h1>

        {summaries.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            Nenhum resumo salvo ainda. 🚀
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map(({ id, content }) => {
              const parsedContent: ParsedContent = JSON.parse(content);

              return (
                <Card
                  key={id}
                  className="relative shadow-lg border border-gray-200 bg-white rounded-xl hover:shadow-xl transition duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {parsedContent.file_name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      📅 {new Date(parsedContent.created_at).toLocaleString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 line-clamp-3 text-sm">
                      {parsedContent.summary_content}
                    </p>
                    <div className="mt-4 flex justify-between">
                      <Button
                        onClick={() => handleCopy(parsedContent.summary_content)}
                        size="sm"
                        className="bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        <ClipboardCopy className="w-4 h-4 mr-2" /> Copiar
                      </Button>
                      <Button
                        onClick={() => handleDelete(id)}
                        variant="destructive"
                        size="sm"
                        className="bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        <Trash className="w-4 h-4 mr-2" /> Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
