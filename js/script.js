const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    // Show hide see all button
    const showAllBtn = document.getElementById('show_btn_container');
    if (phones.length > 6 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    }
    else {
        showAllBtn.classList.add('hidden')
    }

    const phoneContainer = document.getElementById('phone_container');
    // Clear phone container arfer new search
    phoneContainer.innerHTML = ""
    // Show only 6 items from searched items
    if (!isShowAll) {
        phones = phones.slice(0, 6)
    }
    // Create phone card in container
    for (const phone of phones) {
        const div = document.createElement('div');
        div.classList = `card w-96 bg-base-100 shadow-xl p-5`;
        div.innerHTML = `
            <figure class="p-10 bg-blue-50 rounded-bl-2xl rounded-br-2xl">
            <img src="${phone.image}" />
            </figure>
            <div class="card-body items-center text-center space-y-3">
            <h2 class="card-title text-xl font-bold uppercase">Name : ${phone.phone_name}</h2>
            <p class="text-base font-medium">If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
                <button onclick="showModalDetails('${phone.slug}'); show_modal.showModal()" class="btn btn-primary w-40 rounded-full text-lg font-bold bg-blue-500 border-none">Buy Now</button>
            </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    }
    loadingSpinner(false);
}

//Search Button functionality
const searchFunctionality = (isShowAll) => {
    const searchField = document.getElementById('search_input');
    const searchText = searchField.value;
    loadingSpinner(true);
    loadPhone(searchText, isShowAll);
}
// Loding Spinner 
const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById('loading_spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

// Handle Show All button
const handleShowAll = () => {
    searchFunctionality(true)
}

// Show Modal
const showModalDetails = async (phoneID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneID}`);
    const data = await res.json();
    console.log(data);
    modalContentUpdate(data.data);
}

// Edit modal 
const modalContentUpdate = (phone) => {
    const modalBox = document.getElementById('modal_box');
    modalBox.innerHTML = `
    <figure class="p-10 bg-blue-50 rounded-bl-2xl rounded-br-2xl flex justify-center items-center">
        <img src="${phone.image}" />
    </figure>
    <h3 class="font-bold text-lg uppercase mt-5">Name : ${phone.slug}</h3>
    <p class="py-1 font-bold">Release Date : <span class="font-medium"> ${phone.releaseDate} </span></p>
    <p class="py-1 font-bold">Chipset : <span class="font-medium"> ${phone.mainFeatures?.chipSet} </span></p>
    <p class="py-1 font-bold">Memory : <span class="font-medium"> ${phone.mainFeatures?.memory} </span></p>
    <p class="py-1 font-bold">Sensors : <span class="font-medium"> ${phone.mainFeatures?.sensors.join(', ')} </span></p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    `
}