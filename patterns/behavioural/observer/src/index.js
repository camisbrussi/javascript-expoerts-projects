/*"VOCÊ NÃO ME CHAMA, EU CHAMO VOCê"
Agora vamos criar observadores, uma lista de atores que precisam ser notificados
quando essa ação acontecer. Quando algo "acontecer", ao invés de bater no banco de dados
todas as áreas são notificadas com a atualização via evento, processando cada usuário
de forma unitaria */

import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";


const subject = new PaymentSubject();
const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment()
subject.subscribe(shipment);

const payment = new Payment(subject)
payment.creditCard({ userName : 'camisbrussi', id: Date.now()});

subject.unsubscribe(marketing);

payment.creditCard({ userName: 'mariazinha', id: Date.now()});