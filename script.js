window.addEventListener("DOMContentLoaded", function () {
	// Listen in tabellen umwandeln und zahlen counter hinzufügen
	var lists = document.querySelectorAll("ul");

	lists.forEach(function (list) {
		var table = document.createElement("table");
		var tbody = document.createElement("tbody");

		var items = list.getElementsByTagName("li");

		for (var i = 0; i < items.length; i++) {
			var row = document.createElement("tr");

			var cell1 = document.createElement("td");
			cell1.textContent = items[i].textContent;

			var cell2 = document.createElement("td");
			var select = document.createElement("select");

			for (var j = 0; j <= 10; j++) {
				var option = document.createElement("option");
				option.text = j;
				option.value = j;
				select.add(option);
			}

			cell2.appendChild(select);

			row.appendChild(cell1);
			row.appendChild(cell2);

			tbody.appendChild(row);
		}

		table.appendChild(tbody);
		list.parentNode.replaceChild(table, list);
	});
//--------------------------------------------------------------------------------------------
	// Get references to the select elements and sections
	const select1 = document.getElementById("ort");
	const select2 = document.getElementById("art");
	const sections = document.querySelectorAll("section");

	// Function to show/hide sections based on the selected values
	function updateSections() {
		const selectedValue1 = select1.value;
		const selectedValue2 = select2.value;

		sections.forEach((section) => {
			const sectionClasses = section.classList;

			if (
				(selectedValue1 === "all" || sectionClasses.contains(selectedValue1)) &&
				(selectedValue2 === "all" || sectionClasses.contains(selectedValue2))
			) {
				section.style.display = "block";
			} else {
				section.style.display = "none";
			}
		});
	}

	// Attach event listeners to the select elements
	select1.addEventListener("change", updateSections);
	select2.addEventListener("change", updateSections);

	// Initially show all sections
	sections.forEach((section) => {
		section.style.display = "block";
	});
//--------------------------------------------------------------------------------------------
	// farben ändern jeh nach zahl und klicken
	sections.forEach((section) => {
		const numberSelectors = section.querySelectorAll("select");

		numberSelectors.forEach((numberSelector) => {
			numberSelector.addEventListener("change", function () {
				const row = this.parentNode.parentNode;

				if (this.value !== "0") {
					row.classList.add("red-row");
					row.classList.remove("orange-row");
					row.classList.remove("green-row");
				} else {
					row.classList.remove("red-row");
					row.classList.remove("orange-row");
					row.classList.remove("green-row");
				}
			});
		});
	});

	const rows = document.querySelectorAll("tr");

	rows.forEach((row) => {
		const firstCell = row.querySelector("td:first-child");
		const numberSelector = row.querySelector("select");

		firstCell.addEventListener("click", function () {
			if (row.classList.contains("orange-row")) {
				row.classList.remove("orange-row");
				row.classList.add("green-row");
				numberSelector.value = "0";
			} else if (row.classList.contains("green-row")) {
				row.classList.remove("green-row");
				row.classList.remove("red-row");
			} else if (row.classList.contains("red-row")) {
				row.classList.add("orange-row");
			}
		});
	});
});
