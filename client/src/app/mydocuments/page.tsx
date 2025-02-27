'use client';

import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import api from "../../services/api";
import { ClipboardCopy, Trash, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";
import Header from "components/tela_chatbot/Header";

interface Summary {
  id: number;
  content: string; 
  user_email: string;
}

interface Analysis {
  id: number;
  image_url: string;
  user_email: string;
  created_at: string;
}

interface ParsedContent {
  file_name: string;
  summary_content: string;
  created_at: string;
}

export default function MeusDocumentos() {
  const { data: session } = useSession();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [savedImages, setSavedImages] = useState<Analysis[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      api.get(`/users/${session.user.email}/summaries/`)
        .then(response => {
          setSummaries(response.data.summaries);
        })
        .catch(error => console.error("Erro ao buscar resumos", error));

      fetchAnalyses(); 
    }
  }, [session]);

  const fetchAnalyses = async () => {
    try {
      const response = await fetch("/api/get_analyses");
      if (!response.ok) throw new Error("Erro ao buscar análises");
      const data = await response.json();
      setSavedImages(data.analyses);
    } catch (error) {
      console.error("Erro ao carregar análises", error);
    }
  };

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

  const handleDeleteAnalysis = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta análise?")) {
      try {
        if (session?.user?.email) {
          await api.delete(`/users/${session.user.email}/analyses/${id}`);
          setSavedImages(prev => prev.filter(analysis => analysis.id !== id));
        }
      } catch (error) {
        console.error("Erro ao excluir análise", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-6 py-12 pt-24">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Meus Documentos</h1>

        {/* Seção de Resumos */}
        {summaries.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">Nenhum resumo salvo ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map(({ id, content }) => {
              const parsedContent: ParsedContent = JSON.parse(content);

              return (
                <Card key={id} className="flex-1 shadow-lg border border-gray-200 bg-white rounded-xl hover:shadow-xl transition duration-300 flex flex-col">
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
                    <Button onClick={() => handleCopy(parsedContent.summary_content)} size="sm" className="bg-[#007aff] text-white hover:bg-blue-700 transition rounded-full">
                      <ClipboardCopy className="w-4 h-4 mr-2" /> Copiar
                    </Button>
                    <Button onClick={() => handleDelete(id)} variant="destructive" size="sm" className="bg-[#ff2d55] text-white hover:bg-red-700 transition rounded-full p-2">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Seção de Análises (Imagens) */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Minhas Análises</h2>

          {savedImages.length === 0 ? (
            <p className="text-gray-500 text-center text-lg mt-6">Nenhuma análise salva ainda.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {savedImages.map(({ id, image_url }, index) => (
                <Card key={id} className="shadow-lg border border-gray-200 bg-white rounded-xl hover:shadow-xl transition duration-300">
                  <CardContent className="flex justify-center">
                    <img src={image_url} alt={`Análise ${index}`} className="w-full h-auto rounded-lg"/>
                  </CardContent>
                  <div className="mt-4 flex justify-end p-4">
                    <Button onClick={() => handleDeleteAnalysis(id)} variant="destructive" size="sm" className="bg-[#ff2d55] text-white hover:bg-red-700 transition rounded-full p-2">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
