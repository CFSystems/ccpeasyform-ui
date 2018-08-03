export class Pergunta {
    id: number;
    nome: string;
    descricao: string;
    tipo: string;
    opcoes: Array<Opcao>;
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
    formularioPergunta: Array<FormularioPergunta>;
}

export class FormularioPergunta {
    id: {
        idFormulario: number;
        idPergunta: number;
    }
    pergunta: Pergunta;
    ordem: number;
}

export class Campanha {
    id: number;
    nome: string;
    cliente: string;
    dataInicio: Date;
    dataTermino: Date;
    status: string;
    campanhaFormulario: Array<CampanhaFormulario>;
}

export class CampanhaFormulario {
    id: {
        idCampanha: number;
        idFormulario: number;
    }
    formulario: Formulario;
    ordem: number;
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