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

  // Store selected values in local storage
  localStorage.setItem("selectedValue1", selectedValue1);
  localStorage.setItem("selectedValue2", selectedValue2);
}

// Attach event listeners to the select elements
select1.addEventListener("change", updateSections);
select2.addEventListener("change", updateSections);

// Get stored values from local storage or set default values
const storedValue1 = localStorage.getItem("selectedValue1") || "all";
const storedValue2 = localStorage.getItem("selectedValue2") || "all";

// Set the stored values as selected options
select1.value = storedValue1;
select2.value = storedValue2;

// Initially update sections based on stored values
updateSections();

// Initially show all sections

	//--------------------------------------------------------------------------------------------
	// farben ändern jeh nach zahl und klicken

	const rows = document.querySelectorAll("tr");
	rows.forEach((row) => {
		const section = row.closest("section");
		const sectionclass = Array.from(section.classList)
			.filter((className) => className !== "section")
			.join("-");

		const firstCell = row.querySelector("td:first-child");
		const numberSelector = row.querySelector("select");
		const name = firstCell.textContent;

		function updateStorage() {
			localStorage.setItem(`N-${sectionclass}-${name}`, numberSelector.value);
			localStorage.setItem(`C-${sectionclass}-${name}`, row.classList.value);
		}

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
				row.classList.remove("red-row");
			}
			updateStorage();
		});

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
			updateStorage();
		});
	});

	function reapplySavedValues() {
		const rows = document.querySelectorAll("tr");
		rows.forEach((row) => {
			const section = row.closest("section");
			const sectionclass = Array.from(section.classList)
				.filter((className) => className !== "section")
				.join("-");

			const firstCell = row.querySelector("td:first-child");
			const numberSelector = row.querySelector("select");
			const name = firstCell.textContent;

			// Retrieve the stored values from the local storage
			const storedNumberValue = localStorage.getItem(`N-${sectionclass}-${name}`);
			const storedClassValue = localStorage.getItem(`C-${sectionclass}-${name}`);

			// Update the numberSelector value
			if (storedNumberValue !== null) {
				numberSelector.value = storedNumberValue;
			}

			// Update the row classList value
			if (storedClassValue !== null) {
				row.classList.value = storedClassValue;
			}
		});
	}

	// Call the reapplySavedValues function after the page has finished loading
	window.addEventListener("load", reapplySavedValues);

	function resetValues() {
		// Ask for confirmation before resetting
		const confirmed = window.confirm(
			"Bist du dir sicher, dass du alle LogiListen zurücksetzen möchtest?"
		);

		if (confirmed) {
			const rows = document.querySelectorAll("tr");
			rows.forEach((row) => {
				const section = row.closest("section");
				const sectionclass = Array.from(section.classList)
					.filter((className) => className !== "section")
					.join("-");

				const firstCell = row.querySelector("td:first-child");
				const numberSelector = row.querySelector("select");
				const name = firstCell.textContent;

				// Reset the numberSelector value to 0
				numberSelector.value = "0";

				// Remove the row classes
				row.classList.remove("red-row", "orange-row", "green-row");
			});

			// Clear all items from local storage
			localStorage.clear();
		}
	}

	// Create a reset button
	const resetButton = document.getElementById("reset");
	resetButton.addEventListener("click", resetValues);
});
