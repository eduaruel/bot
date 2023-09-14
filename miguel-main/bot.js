require('dotenv').config();
const axios = require('axios');
const consultaDolar = require("consulta-dolar-venezuela");

//consultaDolar.getMonitor("null").then($ =>{console.log($)}); /*Obtener los valores de todos los monitores*/
//consultaDolar.getMonitor("EnParaleloVzla", "price", false).then($ =>{console.log($)}); /*Obtener el valor del dólar en EnParaleloVzla*/
//consultaDolar.getMonitor("BCV", "lastUpdate").then($ =>{console.log($)}); /*Obtener la ultima actualizacion del dólar en BCV*/

const {Client,GatewayIntentBits} = require('discord.js');
const client = new Client(
    {intents:
        [GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    })

    client.on('ready',()=>{
        console.log('El bot esta listo');
    })

    client.on('messageCreate', async(message)=>{
        if(message.content === 'ping'){
            message.reply({
                content:'pong'
            })
        }else if(message.content === 'hola'){
            message.reply({
                content:'Bienvenido a nuestro canal'
            })
        }else if(message.content === 'quote'){
            let resp = await axios.get('https://api.quotable.io/random');
            const quote = resp.data.content;

            message.reply({
                content:quote
            })
        }else if(message.content === 'moneda'){   
             
            let bcv = await consultaDolar.getMonitor("EnParaleloVzla", "price", false).
            then(i =>{message.reply({
                content:i
            })
        });
           // const moneda = bcv.getMonitor({title,price,change,lastUpdate});

            
        }
    })

    client.login(process.env.DISCORD_BOT_ID);