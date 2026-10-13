import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import iconDireccion from '../assets/direccion.png'
import iconTelefono from '../assets/telefono.png'
import iconHorario from '../assets/horario.png'
import iconEmail from '../assets/email.png'

interface ContactInfo {
  img: string
  label: string
  value: string
  bg: string
}

const contactInfo: ContactInfo[] = [
  { img: iconDireccion, label: 'Dirección', value: 'Hipólito Yrigoyen 1234, Trelew - Chubut', bg: '#FFD6E8' },
  { img: iconTelefono, label: 'Teléfono', value: '+54 9 280 000-0000', bg: '#E8D6FF' },
  { img: iconHorario, label: 'Horario', value: 'Lun–Sáb: 8:00 AM – 8:00 PM', bg: '#D6EEFF' },
  { img: iconEmail, label: 'Email', value: 'capitalcake@gmail.com', bg: '#D6FFE8' },
]

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formRef.current) return

    const data = new FormData(formRef.current)
    const usuario = Object.fromEntries(data)
    console.log(usuario)

    formRef.current.reset()

    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

return (
  <div className="container">
    <section className="contact-section">
      <div className="contact-header">
        <span className="contact-badge">Contacto</span>
        <h1>¿Hablamos?</h1>
        <p>Estamos aquí para hacer tus momentos más dulces. ¡Escribinos!</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          {contactInfo.map(item => (
            <div key={item.label} className="contact-info-card">
              <div className="contact-img"> <img src={item.img} alt={item.label} /></div>
              <div>
                <p className="contact-label">{item.label}</p>
                <p className="contact-value">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        <form ref= {formRef} onSubmit={handleSubmit} className="contact-form">
          <div className='form-group'>
            <label htmlFor='name' className='form-label mt-4'>Nombre</label>
            <input type='text' className='form-control' id='name' placeholder='Tu Nombre'/>
          </div>

          <div className='form-group'>
          <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Tu email@.com" />
          <small id="emailHelp" className="form-text text-muted">No compartimos tu email con nadie</small>
          </div>

          <div className='form-group'>
            <label htmlFor="message" className="form-label mt-4">Mensaje</label>
            <textarea className="form-control" id="message" name='message' rows={3} placeholder='¿En qué podemos ayudarte?'/>
          </div>
          
          {enviado && <p className='form-success'>Mensaje enviado. Te responderemos pronto :3</p>}

          <button type="submit" className="btn btn-secondary">Enviar Mensaje</button>
        </form>
      </div>
    </section>
    </div>
  )
}

export default Contact