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

        <p>${phone.slug}</p>

        <div class="card-actions justify-center">
        <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>

        </div>  

        `

        phoneContainer.appendChild(createPhoneDiv)
    });
    loadingSpinner(false);
}

const showDetailsHandler = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);

    const phone = data.data;

    modalHandler(phone)
}

const modalHandler = (phone) => {
    console.log(phone);
    const modalPhone = document.getElementById('modal-phone-id');
    modalPhone.innerText = phone.name;

    const phoneDivContainer = document.getElementById('modal-phone-div-container');
    phoneDivContainer.innerHTML = `
    <img src="${phone.image}"
    alt="" />
    <p>Storage : ${phone?.mainFeatures?.storage}</p>
    <p>GPS : ${phone?.others?.GPS}</p>
    `
    show_details_modal.showModal()
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

