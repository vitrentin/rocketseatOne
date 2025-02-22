// import { Fragment } from "react"
import { useState, useEffect } from "react"
import { Container, Links, Content } from "./styles"
import { useParams, useNavigate } from "react-router-dom"
import { Tag } from "../../components/Tag"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"
import { api } from "../../../../rocketnotes-back/src/services/api"

export function Details() {
  const [data, setData] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?")
    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      handleBack()
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    fetchNote()
  })
  // Um componente retorna 1 elemento
  // mas dentro do elemento que ele retorna
  // podemos ter quantos elementos quiser
  return (
    // Fragment, ou <> não recebe estilização, ao contrário da div
    <Container>
      <Header />

      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemove} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}
            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}
            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  )
}
