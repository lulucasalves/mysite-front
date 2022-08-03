import { Formik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiOutlineMedium
} from 'react-icons/ai'
import { submitSchema } from '../../schemas'
import { MdOutlineEmail } from 'react-icons/md'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { IMyContext, MyContext } from '../../store/config'

interface ISubmit {
  name: string
  email: string
  cellphone?: string
}

interface IEmail {
  setEmail: (value: boolean) => void
}

export function Contact({ setEmail }: IEmail) {
  const [level, setLevel] = useState<number>(1)
  const { lang } = useContext<IMyContext>(MyContext)
  const [sended, setSended] = useState(false)

  function handleSendForm(values: ISubmit) {
    if (!values.email || level === 1) {
      setLevel(2)
    } else {
      const templateParams = {
        to_name: values.name,
        to_email: values.email.toLocaleLowerCase(),
        phone: values.cellphone || ''
      }

      emailjs
        .send(
          process.env.NEXT_PUBLIC_SERVICEID || '',
          `lulucasalves${lang || 'en'}`,
          templateParams,
          process.env.NEXT_PUBLIC_USERID
        )
        .then(() => {
          setSended(true)
          setEmail(true)
        })
        .catch(() => {
          alert(
            'Infelizmente ocorreu um erro ;-;, Por favor me envie um email diretamente!'
          )
        })
    }
  }

  return (
    <div id="contact" className="contacts">
      <div className="contactDiv">
        <div className="textSection">
          <h2>Contato</h2>
          <p className="ctaSocialMedia">Me siga nas redes sociais!</p>
          <div
            title="Github"
            className="socialMediaGroup"
            onClick={() =>
              window.open('https://github.com/lulucasalves', '_blank')
            }
          >
            <AiOutlineGithub />
            <p>lulucasalves</p>
          </div>
          <div
            title="Linkedin"
            className="socialMediaGroup"
            onClick={() =>
              window.open('https://linkedin.com/in/lulucasalves', '_blank')
            }
          >
            <AiFillLinkedin />
            <p>Lucas Alves</p>
          </div>
          <div
            title="Medium"
            className="socialMediaGroup"
            onClick={() =>
              window.open('https://medium.com/@lulucasalves', '_blank')
            }
          >
            <AiOutlineMedium />
            <p>lulucasalves</p>
          </div>
          <p className="ctaSocialMedia">Ou me envie um email</p>
          <div
            className="socialMediaGroup"
            onClick={() =>
              (window.location.href = 'mailto:lucas.alves.supus@outlook.com')
            }
            title="E-mail"
          >
            <MdOutlineEmail />
            <p>lucas.alves.supus@oulook.com</p>
          </div>
        </div>
        <div className="formSection">
          <h3>Entre em contato comigo</h3>

          <Formik
            initialValues={{
              email: '',
              cellphone: '',
              name: ''
            }}
            validationSchema={submitSchema}
            onSubmit={(values) => {
              handleSendForm(values)
            }}
          >
            {({ handleChange, handleBlur, values, handleSubmit, errors }) => (
              <form onSubmit={handleSubmit}>
                {level === 1 && (
                  <div className="buttonAndInput">
                    <div className="inputGroup ">
                      <label htmlFor="name">Nome</label>
                      <br />
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={values.name}
                        onChange={handleChange('name')}
                        onBlur={handleBlur('name')}
                        className={`${errors.name && 'errorInput'} capitalize`}
                      />
                      <div className="submitGroupButton">
                        <div />
                        <button className="submitButton" type="submit">
                          <div className="buttonInner">
                            Continuar <HiArrowNarrowRight />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {level === 2 && (
                  <div className="buttonAndInput">
                    <div className="inputGroup">
                      <label htmlFor="email">E-mail</label>
                      <br />

                      <input
                        id="email"
                        placeholder="johndoe@gmail.com"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        className={errors.email && 'errorInput'}
                      />
                    </div>
                    <div className="inputGroup">
                      <label htmlFor="cellphone">Celular (opcional)</label>
                      <br />
                      <input
                        id="cellphone"
                        placeholder="(555) 147-2947"
                        type="text"
                        value={values.cellphone}
                        onChange={handleChange('cellphone')}
                        onBlur={handleBlur('cellphone')}
                      />
                      <div className="submitGroupButton">
                        <button
                          onClick={() => setLevel(1)}
                          className="normalButton"
                          type="submit"
                        >
                          Voltar
                        </button>
                        <button
                          disabled={sended}
                          className="submitButton"
                          type="submit"
                        >
                          <div className="buttonInner">
                            {sended ? 'Enviado' : 'Enviar'}
                            <FiSend />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
