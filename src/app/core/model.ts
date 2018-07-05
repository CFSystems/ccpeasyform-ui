export class Pergunta {
    id: number;
    nome: string;
    descricao: string;
    tipo: string;
}

export class Opcao {
    id: number;
    nome: string;
    pergunta: Pergunta;
}

export class Formulario {
    id: number;
    nome: string;
    ativo: boolean;
    perguntas: Array<Pergunta>;
}