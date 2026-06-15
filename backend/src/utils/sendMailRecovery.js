const HTMLRecoveryEmail = (code) => {
  return `
        <div style=" font-family: aria, sans-serif; background-color: #f4f4f4 ", padding:20px"
            <h1 style=" color:#2c3e50; font-size: 24px; margin-bottom: 20px;">Password Recovery</h1>
            <p style=" font-size: 16px; color: #555 line-height:1.5;">
                Hola, hemos recibido una solicitud para restablecer su contraseña, para restablecer la contraseña Verifica el codigo
            </p>
            <div style= "display: inline-block; padding: 10px 20px; font-size: 18px; font-weight:blod; color: #fff; background:  #pp7430 ">
             ${code}
             </div>
            <p styles= " font-size:14px; color: #777; line-heigth: 1.5 ">
                Este codigo es valido hasa <strong> 15 minutos </strong> si no fuiste tu ignora este correo
            </p>
            <hr style=" border:none ; border-top: 1px solid #ddd; margin: 20px 0;">
            <footer style= " font-size: 12px; color: #aaa ">
            si necesitas mas asyuda pongase en contato con nuesto equipo de soporte en 
            <a href="mailto:20210032@ricaldone.edu.sv" style="color : #3498db "> support@ricaldone.edu.sv</a>
        </footer>
    </div>
    `;
};
