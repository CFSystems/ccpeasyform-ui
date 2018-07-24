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

export class Campanha {
    id: number;
    nome: string;
    cliente: string;
    dataInicio: Date;
    dataTermino: Date;
    status: string;
    formularios: Array<Formulario>;
}

export class Contato {
    id: number;
    nome: string;
    cpf: string;
    identificador: string;
}

export class Usuario {
    id: number;
    nome: string;
    matricula: string;
    email: string;
    senha: string;
    ativo: boolean;
    permissoes: Array<Permissao>;
}

export class Atendimento {
    id: number;
    contato: Contato;
    campanha: Campanha;
    formulario: Formulario;
    usuario: Usuario;
    dataAtendimento: Date;
}

export class Resposta {
    id: number;
    atendimento: Atendimento;
    pergunta: Pergunta;
    resposta: string;
}

export class Permissao {
    id: number;
    descricao: string;
}