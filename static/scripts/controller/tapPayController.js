import BookingService from "../service/bookingService.js";

class TapPayController {

    bookingService = null;

    constructor(){
        this.bookingService = BookingService.getInstance();

        this.addTapPayScript(()=>{
            this.setCardSetup();

            this.setSetupSdk();
            this.CardInputHandler();
            this.ConfirmButtonHandler();
        })
    }
    
    PayOrder(payHolderData){
        this.bookingService.postPayHolder(payHolderData)
    }

    addTapPayScript(callback){
        const script = document.createElement('script');

        script.src = "https://js.tappaysdk.com/sdk/tpdirect/v5.14.0";
        script.async = true;
        script.addEventListener('load', callback);
        document.body.appendChild(script);
    }

    setSetupSdk(){
        
        if(window.TPDirect){
            console.log(window.TPDirect)
            TPDirect.setupSDK(126878, "app_IaMl5I9AsxpwEUrXXbwvPMnokPAwvZVggZ9nm8mADw9l185OXefRSh7Ra0OD", 'sandbox')
        }else{
            console.error("TPDirect_unload")
        }
    }

    setCardSetup(){
        const fields = {
            number: {
                // css selector
                element: '#card-number',
                placeholder: '**** **** **** ****'
            },
            expirationDate: {
                // DOM object
                element: document.getElementById('card-expiration-date'),
                placeholder: 'MM / YY'
            },
            ccv: {
                element: '#card-ccv',
                placeholder: 'ccv'
            }
        }

        TPDirect.card.setup({
            fields: fields,
            styles: {
                // Style all elements
                'input': {
                    'color': 'gray',
                    "border-radius":"5px" 
                },
                // Styling ccv field
                'input.ccv': {
                    // 'font-size': '16px'
                },
                // Styling expiration-date field
                'input.expiration-date': {
                    // 'font-size': '16px'
                },
                // Styling card-number field
                'input.card-number': {
                    // 'font-size': '16px'
                },
                // style focus state
                ':focus': {
                    // 'color': 'black'
                },
                // style valid state
                '.valid': {
                    'color': 'green'
                },
                // style invalid state
                '.invalid': {
                    'color': 'red'
                },
                // Media queries
                // Note that these apply to the iframe, not the root window.
                '@media screen and (max-width: 400px)': {
                    'input': {
                        'color': 'orange'
                    }
                }
            },
            // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
            isMaskCreditCardNumber: true,
            maskCreditCardNumberRange: {
                beginIndex: 6,
                endIndex: 11
            }
        })
    }

    CardInputHandler(){
        const submitButton = document.querySelector(".ConfirmAndPay")
        TPDirect.card.onUpdate(function (update) {
            console.log(update)
            // update.canGetPrime === true
            // --> you can call TPDirect.card.getPrime()
            if (update.canGetPrime) {
                // Enable submit Button to get prime.
                submitButton.removeAttribute('disabled')
            } else {
                // Disable submit Button to get prime.
                submitButton.setAttribute('disabled', true)
            }
        
            // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unionpay','unknown']
            if (update.cardType === 'visa') {
                // Handle card type visa.
            }
        
            // number 欄位是錯誤的
            if (update.status.number === 2) {
                // setNumberFormGroupToError()
            } else if (update.status.number === 0) {
                // setNumberFormGroupToSuccess()
            } else {
                // setNumberFormGroupToNormal()
            }
        
            if (update.status.expiry === 2) {
                // setNumberFormGroupToError()
            } else if (update.status.expiry === 0) {
                // setNumberFormGroupToSuccess()
            } else {
                // setNumberFormGroupToNormal()
            }
        
            if (update.status.ccv === 2) {
                // setNumberFormGroupToError()
            } else if (update.status.ccv === 0) {
                // setNumberFormGroupToSuccess()
            } else {
                // setNumberFormGroupToNormal()
            }
        })
    }

    ConfirmButtonHandler(){
        const submitButton = document.querySelector(".ConfirmAndPay")
        const onSubmit = (event) => {
            event.preventDefault()
        
            // 取得 TapPay Fields 的 status
            const tappayStatus = TPDirect.card.getTappayFieldsStatus()
        
            // 確認是否可以 getPrime
            if (tappayStatus.canGetPrime === false) {
                alert('can not get prime')
                return
            }
        
            // Get prime
            TPDirect.card.getPrime((result) => {
                if (result.status !== 0) {
                    alert('get prime error ' + result.msg)
                    return
                }
                const contactFormData = this.getContactFormData();
                const payHolderData = {
                    prime: result.card.prime,
                    cardholder: contactFormData
                }
                this.PayOrder(payHolderData)
        
                // send prime to your server, to pay with Pay by Prime API .
                // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
            })
        }
        submitButton.addEventListener("click",onSubmit)
    }

    getContactFormData(){
        const contactForm = document.querySelector('.Contact.Form');
        const contactFormData = new FormData(contactForm);
        return {
            name: contactFormData.get("name"), 
            email: contactFormData.get("email"), 
            phone_number: contactFormData.get("phone_number"),
        };
    }

}

const tapPayController = new TapPayController();