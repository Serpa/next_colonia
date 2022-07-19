import Axios from "axios";
import { useForm } from "react-hook-form";

export default function Cadastro() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) =>
    Axios.post("/api/registerPescador", data).then((response) => {
      console.log(response);
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        style={{ display: "flex", flexFlow: "1", flexDirection: "column" }}
      >
        <legend>Dados de Pescador</legend>
        <label htmlFor="filiacao">Filiação:</label>
        <input {...register("filiacao")} type="date" name="filiacao" />
        <label htmlFor="vencimento">Vencimento:</label>
        <input {...register("vencimento")} type="date" name="vencimento" />
        <label htmlFor="ficha">Ficha:</label>
        <input {...register("ficha")} type="number" name="ficha" />
        <label htmlFor="senha">Senha:</label>
        <input {...register("senha_caepf")} type="password" name="senha_caepf" />
        <label htmlFor="senha2">Digite novamente a Senha:</label>
        <input type="password" name="senha2" />
      </fieldset>

      <fieldset
        style={{ display: "flex", flexFlow: "1", flexDirection: "column" }}
      >
        <legend>Dados Pessoais</legend>
        <label htmlFor="nome">Nome:</label>
        <input {...register("nome")} type="text" name="nome" />
        <label htmlFor="pai">Nome do Pai:</label>
        <input {...register("pai")} type="text" name="pai" />
        <label htmlFor="mae">Nome da Mãe:</label>
        <input {...register("mae")} type="text" name="mae" />
        <label htmlFor="estado_civil">Estado Civil:</label>
        <select {...register("estado_civil")} name="estado_civil">
          <option>Selecione uma opção</option>
          <option value="Solteiro">Solteiro</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
        </select>
        <label htmlFor="nascimento">Data de Nascimento:</label>
        <input {...register("nascimento")} type="date" name="nascimento" />
        <label htmlFor="local_nascimento">Naturalidade:</label>
        <input
          {...register("local_nascimento")}
          type="text"
          name="local_nascimento"
        />
        <label htmlFor="profissao">Profissão:</label>
        <input {...register("profissao")} type="text" name="profissao" />
      </fieldset>

      <fieldset
        style={{ display: "flex", flexFlow: "1", flexDirection: "column" }}
      >
        <legend>Endereço</legend>
        <label htmlFor="localidade">Localidade:</label>
        <input {...register("cidade")} type="text" name="cidade" />
        <label htmlFor="bairro">Bairro:</label>
        <input {...register("bairro")} type="text" name="bairro" />
        <label htmlFor="cep">Cep:</label>
        <input {...register("cep")} type="text" name="cep" />
        <label htmlFor="numero">Número:</label>
        <input {...register("numero")} type="text" name="numero" />
        <label htmlFor="cidade">Cidade</label>
        <input {...register("cidade")} type="text" name="cidade" />
        <label htmlFor="estado">Estado:</label>
        <input {...register("estado")} type="text" name="estado" />
      </fieldset>

      <fieldset
        style={{ display: "flex", flexFlow: "1", flexDirection: "column" }}
      >
        <legend>Documentos</legend>
        <label htmlFor="cpf">CPF:</label>
        <input {...register("cpf")} type="text" name="cpf" />
        <label htmlFor="titulo_eleitor">Título de eleitor:</label>
        <input
          {...register("titulo_eleitor")}
          type="text"
          name="titulo_eleitor"
        />
        <label htmlFor="cnh">CNH:</label>
        <input {...register("cnh")} type="text" name="cnh" />
        <label htmlFor="emissao_cnh">Emissão da CNH:</label>
        <input {...register("emissao_cnh")} type="date" name="emissao_cnh" />
        <label htmlFor="rgp">RGP:</label>
        <input {...register("rgp")} type="text" name="rgp" />
        <label htmlFor="data_rgp">Data da RGP:</label>
        <input {...register("data_rgp")} type="date" name="data_rgp" />
        <label htmlFor="carteira_trabalho">Carteira de Trabalho:</label>
        <input
          {...register("carteira_trabalho")}
          type="text"
          name="carteira_trabalho"
        />
        <label htmlFor="pis">PIS:</label>
        <input {...register("pis")} type="text" name="pis" />
        <label htmlFor="cei">CEI:</label>
        <input {...register("cei")} type="text" name="cei" />
        <label htmlFor="rg">RG:</label>
        <input {...register("rg")} type="text" name="rg" />
        <label htmlFor="orgao_emissor">Orgão Emissor:</label>
        <input
          {...register("orgao_emissor")}
          type="text"
          name="orgao_emissor"
        />
        <label htmlFor="emissao_rg">Data do RG:</label>
        <input {...register("emissao_rg")} type="date" name="emissao_rg" />
      </fieldset>

      <fieldset
        style={{ display: "flex", flexFlow: "1", flexDirection: "column" }}
      >
        <legend>Contatos</legend>
        <label htmlFor="celular">Celular:</label>
        <input {...register("celular")} type="tel" name="celular" />
        <label htmlFor="telefone">Telefone:</label>
        <input {...register("telefone")} type="tel" name="telefone" />
        <label htmlFor="tel_recado">Telefone para Recado:</label>
        <input {...register("tel_recado")} type="tel" name="tel_recado" />
        <label htmlFor="email">Email:</label>
        <input {...register("email")} type="email" name="email" />
        <hr />
        <div className="buttonsCadastro">
          <button type="submit">Cadastrar</button>
        </div>
      </fieldset>
    </form>
  );
}
