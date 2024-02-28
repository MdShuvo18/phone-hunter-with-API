const loadPhone = async (searchInputValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`);
    const data = await res.json();
    // console.log(data)
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones)
}

const displayPhones = phones => {


    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllBtn = document.getElementById('show-all-btn');

    if (phones.length > 12) {
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden')
    }
    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        // console.log(phone)
        const createPhoneDiv = document.createElement('div');
        createPhoneDiv.classList = `card p-4 bg-gray-100 shadow-xl`;
        createPhoneDiv.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Shoes" />
        </figure>

        <div class="card-body">

        <h2 class="card-title">${phone.phone_name}</h2>

        <p>If a dog chews shoes whose shoes does he choose?</p>

        <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
        </div>

        </div>  

        `

        phoneContainer.appendChild(createPhoneDiv)
    });
    loadingSpinner(false);
}

const buttonHandler = () => {
    loadingSpinner(true);
    const searchInput = document.getElementById('serach-input');
    const searchInputValue = searchInput.value;
    console.log(searchInputValue);
    loadPhone(searchInputValue)
}


const loadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}
// loadPhone()

