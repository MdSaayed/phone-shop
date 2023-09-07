// call api
const loadProducts = async (searchText = 'iphone') => {
    loadingSpinner(true);
    let res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    if (res) {
        let data = await res.json();
        let phones = data.data;
        if (phones.length <= 0) {
            document.getElementById('product-container').innerHTML = 'No product founded';
            console.log('baby');
        }
        displayProducts(phones);
        removeChild('product-container');
    }

}
loadProducts();

// display products
function displayProducts(products) {
    var products = products;
    var productContainer = document.getElementById('product-container');
    removeChild('#product-container');
    // control show all button
    const showAllContainer = document.getElementById('show-all-container');
    if (products.length > 12) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // show 12 products
    var products = products.slice(0, 12);
    products.forEach(product => {
        var div = document.createElement('div');
        div.id = 'product';
        div.classList = `product border p-4 rounded`;
        div.innerHTML = `
            <div class="product-img bg-[#0D6EFD0D] py-8 px-4 mb-2 flex justify-center rounded">
                <img src="${product.image}" alt="">
            </div>
            <div class="text-center">
                <h2 class="text-2xl font-semibold">${product.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <p class="font-semibold my-2">$${Math.floor(Math.random() * 1000)}</p>
                <button onclick="handleShowDetails('${product.slug}')" href="" class="show-details primary-color text-white px-4 py-1 rounded inline-block">Show Details</button>
            </div>
        `;
        productContainer.appendChild(div);
    });
    loadingSpinner(false);
}

// event handler
document.getElementById('search-btn').addEventListener('click', function () {
    var searchField = document.getElementById('serach-field');
    var serachText = searchField.value;
    searchField.value = '';
    loadProducts(serachText);
});

// remove child
function removeChild(elementId) {
    var element = document.querySelectorAll(elementId);
    element.forEach(item => {
        var child = item.lastElementChild;
        while (child) {
            item.removeChild(child);
            child = item.lastElementChild;
        }
    });

}

// handleShowDetails
const handleShowDetails = async (slug) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const datas = await res.json();
    const data = datas.data;
    const productDetailsPopup = document.getElementById('single-product-popup');
    productDetailsPopup.style.display = 'flex';

    productDetailsPopup.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="details-box m-2 rounded-lg w-[28rem] relative">
            <div class="flex justify-end absolute top-2 right-2">
                <i id="details-close-btn" onclick="hideDetails()" class="fa-solid fa-xmark cursor-pointer"></i>
            </div>
                <div class="product-img bg-[#0D6EFD0D] py-8 px-4 mb-2 flex justify-center rounded">
                    <img src="${data.image}" alt="">
                </div>
                <div class="text-left mt-4">
                    <h2 class="text-2xl font-semibold">${data.name}</h2>
                    <p class="font-bold text-[12px] my-2">Storage: <span class="font-normal text-normal">${data.mainFeatures.storage}</span></p>
                    <p class="font-bold text-[12px] my-2">Display Size: <span class="font-normal text-normal">${data.mainFeatures.displaySize}</span></p>
                    <p class="font-bold text-[12px] my-2">Chipset: <span class="font-normal text-normal">${data.mainFeatures.chipSet}</span></p>
                    <p class="font-bold text-[12px] my-2">Memory: <span class="font-normal text-normal">${data.mainFeatures.memory}</span></p>
                    <p class="font-bold text-[12px] my-2">Slug: <span class="font-normal text-normal">${data?.slug}</span></p>
                    <p class="font-bold text-[12px] my-2">Release data: <span class="font-normal text-normal">${data?.releaseDate}</span></p>
                    <p class="font-bold text-[12px] my-2">Brand: <span class="font-normal text-normal">${data?.brand}</span></p>
                    <p class="font-bold text-[12px] my-2">GPS: <span class="font-normal text-normal">${data?.others?.GPS}</span></p>
                </div>
            </div>  
    `;
}

// hide detail popup
function hideDetails() {
    document.getElementById('single-product-popup').style.display = 'none';
};

// load spinner
function loadingSpinner(status) {
    let loadingSpinner = document.getElementById('loading-container');
    if (status) {
        loadingSpinner.style.display = 'flex';
    } else {
        loadingSpinner.style.display = 'none';
    }
}




