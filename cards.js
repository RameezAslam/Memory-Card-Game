const cards = document.querySelectorAll('.card');

let matchedCards = 0;
let cardOne,cardTwo;
let disableDeck = false;

function flipCard(e) {
    let clickedcard = e.target;

    if(clickedcard !== cardOne && !disableDeck ){ /* clickedcard!== cardone checks if the clicked card like card one is 
        not clicked twice and !disabledeck says 'not disabled' which is true so next part comes where cardone is initially
        undefined bcz any variable declared using let,var without any value considered undefined so it checks !cardone which
        means if cardone is undefined so then it is assigned clicked card so it is true then cardtwo will be assigned
        after matching the disable deck is set to true preventing user clicks until complete matching  */

        clickedcard.classList.add('flip');
        if(!cardOne){
           return cardOne = clickedcard;
        }
        cardTwo = clickedcard;
        disableDeck = true;
    
        let cardOneImg = cardOne.querySelector('img').src,
        cardTwoImg = cardTwo.querySelector('img').src;

        matchCards(cardOneImg,cardTwoImg);
    }

}

function matchCards(img1,img2) {
    if(img1 === img2) {
        matchedCards ++;
        if(matchedCards === 8){
            setTimeout(()=> {
                return shuffleCard();
            },1000);
        }
        cardOne.removeEventListener('click',flipCard);
        cardTwo.removeEventListener('click',flipCard);
        cardOne = cardTwo = '';
        disableDeck = false;

    }else {
        setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        },400);

        setTimeout(() => {
            cardOne.classList.remove('shake','flip');
            cardTwo.classList.remove('shake','flip');
            cardOne = cardTwo = '';
            disableDeck =false;
        },1200); 
    }
}

function shuffleCard() {
    matchedCards = 0;
    cardOne = cardTwo = '';
    disableDeck =false;
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]; // index starts with 0 but we are just designing game upon card numbers so we can start with 1 as their are 8x2 cards
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // 1 and -1 in js means 1 means the onject should come before it and -1 means it should come after all of this

    cards.forEach((card,index) => {
        card.classList.remove('flip');
        let ImgTag = card.querySelector('img');
        ImgTag.src = `Memory Card Game Images/img-${arr[index]}.png`;
        card.addEventListener('click', flipCard);
    })
}
shuffleCard();

cards.forEach(card => {
    card.addEventListener('click',flipCard);
});