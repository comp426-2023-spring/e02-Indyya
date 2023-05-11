// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

import { rps, rpsls } from "./rpsls.js";

// Prepare dynamic result display.
const showResult = (gOutcome, gPlayOpponent) => {
  const resultContainer = document.querySelector(".results");
  resultContainer.innerHTML = gPlayOpponent ? `
    <div class="result-summary">
      <span class="result-owner">You:</span>
      <span class="result-output">${gOutcome.player}</span>
    </div>
    <br />
    <div class="result-summary">
      <span class="result-owner">Your opponent:</span>
      <span class="result-output">${gOutcome.opponent}</span>
    </div>
    <br />
    <div class="result-summary">
      <span class="result-label">Result:</span>
      <span class="result-output"><strong>you ${gOutcome.result.toUpperCase()}</strong></span>
    </div>
    <br />` : `
    <div class="result-summary">
      <span class="result-output"><strong>${gOutcome.player.toUpperCase()}</strong></span>
    </div>`;

  const playButton = document.querySelector(".play-button");
  playButton.setAttribute("hidden", true);
};

// Get user input and mode.
const getUMode = () => {
  const uModeButton = document.querySelector(".mode-selection:checked");
  return uModeButton ? uModeButton.getAttribute("id") : null;
};

const getUInput = () => {
  const uSelectionButton = document.querySelector(".selections-button:checked");
  return uSelectionButton ? uSelectionButton.getAttribute("selection-summary") : null;
};

// Reset the game when the user clicks the start over button.
const resetGame = () => {
  const resultContainer = document.querySelector(".results");
  resultContainer.innerHTML = "";
  const uSelectionButtons = document.querySelectorAll(".selections-button");
  uSelectionButtons.forEach((b) => { b.checked = false; });
  const oppCheckbox = document.getElementById("opponent");
  oppCheckbox.checked = false;
  const playButton = document.querySelector(".play-button");
  playButton.removeAttribute("hidden");
  const uSelectionButtonsContainer = document.querySelector(".inputs");
  uSelectionButtonsContainer.innerHTML = "";
};

// Add event listeners to buttons.
document.addEventListener("DOMContentLoaded", () => {
  const startOverButton = document.querySelector(".start-over-button");
  startOverButton.addEventListener("click", resetGame);

  const playButton = document.querySelector(".play-button");
  playButton.addEventListener("click", () => {
    const gPlayOpponent = document.getElementById("opponent").checked;
    const mode = getUMode();
    let gOutcome;

    if (mode === "rps") {
      gOutcome = gPlayOpponent ? rps(getUInput()) : rps();
    } else if (mode === "rpsls") {
      gOutcome = gPlayOpponent ? rpsls(getUInput()) : rpsls();
    }

    showResult(gOutcome, gPlayOpponent);
  });

  document.querySelectorAll(".mode-selection").forEach((uModeButton) => {
    uModeButton.addEventListener("change", () => {
      const gPlayOpponent = document.getElementById("opponent").checked;

      if (!gPlayOpponent) return;

      const mode = getUMode();
      const uSelectionButtonsContainer = document.querySelector(".inputs");

      if (mode == "rps") {
                u_selection_buttons_container.innerHTML = `
                    <input type="radio" class="selections-button" name="user-choice" value="rock" selection-summary="rock"> Rock
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="paper" selection-summary="paper"> Paper
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="scissors" selection-summary="scissors"> Scissors`;
            } else if (mode == "rpsls") {
                u_selection_buttons_container.innerHTML = `
                    <input type="radio" class="selections-button" name="user-choice" value="rock" selection-summary="rock"> Rock
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="paper" selection-summary="paper"> Paper
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="scissors" selection-summary="scissors"> Scissors
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="lizard" selection-summary="lizard"> Lizard
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="spock" selection-summary="spock"> Spock`;
            }
        });
    });
});
