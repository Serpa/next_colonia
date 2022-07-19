import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PhishingIcon from "@mui/icons-material/Phishing";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./Dashboard/listItems";
// import { secondaryListItems } from './listItems';
import { useState } from "react";
import { MeetingRoom } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent(props) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) =>
    Axios.post("/api/registerPescador", data).then((response) => {
      console.log(response);
    });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <PhishingIcon />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Colônia de Pescadores
          </Typography>
          <IconButton color="inherit" onClick={() => signOut()}>
            <MeetingRoom color="inherit">
              <NotificationsIcon />
            </MeetingRoom>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset
                    style={{
                      display: "flex",
                      flexFlow: "1",
                      flexDirection: "column",
                    }}
                  >
                    <legend>Dados de Pescador</legend>
                    <label htmlFor="filiacao">Filiação:</label>
                    <input
                      {...register("filiacao")}
                      type="date"
                      name="filiacao"
                    />
                    <label htmlFor="vencimento">Vencimento:</label>
                    <input
                      {...register("vencimento")}
                      type="date"
                      name="vencimento"
                    />
                    <label htmlFor="ficha">Ficha:</label>
                    <input {...register("ficha")} type="number" name="ficha" />
                    <label htmlFor="senha">Senha:</label>
                    <input
                      {...register("senha_caepf")}
                      type="password"
                      name="senha_caepf"
                    />
                    <label htmlFor="senha2">Digite novamente a Senha:</label>
                    <input type="password" name="senha2" />
                  </fieldset>

                  <fieldset
                    style={{
                      display: "flex",
                      flexFlow: "1",
                      flexDirection: "column",
                    }}
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
                    <input
                      {...register("nascimento")}
                      type="date"
                      name="nascimento"
                    />
                    <label htmlFor="local_nascimento">Naturalidade:</label>
                    <input
                      {...register("local_nascimento")}
                      type="text"
                      name="local_nascimento"
                    />
                    <label htmlFor="profissao">Profissão:</label>
                    <input
                      {...register("profissao")}
                      type="text"
                      name="profissao"
                    />
                  </fieldset>

                  <fieldset
                    style={{
                      display: "flex",
                      flexFlow: "1",
                      flexDirection: "column",
                    }}
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
                    style={{
                      display: "flex",
                      flexFlow: "1",
                      flexDirection: "column",
                    }}
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
                    <input
                      {...register("emissao_cnh")}
                      type="date"
                      name="emissao_cnh"
                    />
                    <label htmlFor="rgp">RGP:</label>
                    <input {...register("rgp")} type="text" name="rgp" />
                    <label htmlFor="data_rgp">Data da RGP:</label>
                    <input
                      {...register("data_rgp")}
                      type="date"
                      name="data_rgp"
                    />
                    <label htmlFor="carteira_trabalho">
                      Carteira de Trabalho:
                    </label>
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
                    <input
                      {...register("emissao_rg")}
                      type="date"
                      name="emissao_rg"
                    />
                  </fieldset>

                  <fieldset
                    style={{
                      display: "flex",
                      flexFlow: "1",
                      flexDirection: "column",
                    }}
                  >
                    <legend>Contatos</legend>
                    <label htmlFor="celular">Celular:</label>
                    <input {...register("celular")} type="tel" name="celular" />
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                      {...register("telefone")}
                      type="tel"
                      name="telefone"
                    />
                    <label htmlFor="tel_recado">Telefone para Recado:</label>
                    <input
                      {...register("tel_recado")}
                      type="tel"
                      name="tel_recado"
                    />
                    <label htmlFor="email">Email:</label>
                    <input {...register("email")} type="email" name="email" />
                    <hr />
                  </fieldset>
                    <div className="buttonsCadastro" style={{display: "flex",margin: "5px", justifyContent:"center", alignItems:"center", padding:"10px"}}>
                      <Button type="submit" variant="contained" style={{width:"300px"}}>Cadastrar</Button>
                    </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export default function Cadastro(props) {
  return <DashboardContent />;
}
