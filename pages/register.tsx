import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";

export default function Register() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [acesso, setAcesso] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const registerUser = async (event) => {
    event.preventDefault();

    const data = {
      usuario: usuario,
      senha: senha,
      acesso: acesso,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    await axios.post("/api/register", data);
    signIn("credentials", {
      usuario,
      senha,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
    })
      .then(function (result) {
        router.push(result.url);
      })
      .catch((err) => {
        alert("Failed to register: " + err.toString());
      });
  };

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <label>
          Usuario:{" "}
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>
        <label>
          Senha:{" "}
          <input
            type="text"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <label>
          Acesso:{" "}
          <input
            type="number"
            max={4}
            min={0}
            value={acesso}
            onChange={(e) => setAcesso(+e.target.value)}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register User</button>

        <Link href="/register">Register</Link>
      </form>
    </>
  );
}
