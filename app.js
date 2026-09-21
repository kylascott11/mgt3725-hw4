// app.js
// Behavior and data. Three functions: load, save, render. Same shape as HW3.
// What changed in HW4 is where load and save go: two lines, plus what
// happens when they fail. Everything else that changes is a consequence of
// those two lines, and that is what HW4 asks you to write down.

// Paste your deployed Worker URL here after `npx wrangler deploy`.
const API = "https://mgt3745-hw4.kscott92.workers.dev"

// ---- HW3, for the record (superseded by ADR-002) ------------------------
// function load()      { return JSON.parse(localStorage.getItem("entries") || "[]"); }
// function save(list)  { localStorage.setItem("entries", JSON.stringify(list)); }
// -------------------------------------------------------------------------

(() => {
  'use strict';

  const goalForm = document.querySelector('#goalForm');
  const goalNameInput = document.querySelector('#goalName');
  const goalPercentageInput = document.querySelector('#goalPercentage');
  const goalStatusSelect = document.querySelector('#goalStatus');
  const notStartedGoalList = document.querySelector('#notStartedGoalList');
  const inProgressGoalList = document.querySelector('#inProgressGoalList');
  const completedGoalList = document.querySelector('#completedGoalList');
  const goalError = document.querySelector('#goalError');
  const percentageError = document.querySelector('#percentageError');
  const saveStatus = document.querySelector('#saveStatus');
  const saveError = document.querySelector('#saveError');
  const emptyState = document.querySelector('#emptyState');
  const statusLabels = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    completed: 'Completed'
  };
  let progressTracker = { goals: [] };
  // Give each goal a unique ID so individual goals can be edited or deleted later.
  let nextGoalId = 1;

  async function loadProgressTracker() {
    try {
      const res = await fetch(API + '/entries');
      if (!res.ok) throw new Error('could not load');
      const entries = await res.json();
      const savedTracker = [...entries].reverse().map(entry => {
        try { return JSON.parse(entry.text); } catch { return null; }
      }).find(value => value && Array.isArray(value.goals));
      const trackerGoalNames = new Set((savedTracker?.goals || []).map(goal => goal.name));
      const legacyGoals = entries
        .filter(entry => {
          try { return !Array.isArray(JSON.parse(entry.text).goals); } catch { return true; }
        })
        .filter(entry => !trackerGoalNames.has(entry.text))
        .map(entry => ({
          id: entry.id,
          name: entry.text,
          percentage: 0,
          status: 'not-started'
        }));
      return { goals: [...legacyGoals, ...(savedTracker?.goals || [])] };
    } catch {
      saveError.textContent = 'Could not load saved goals from the server.';
      return { goals: [] };
    }
  }

  function getProgressStatus(percentage) {
    return percentage === 100 ? 'completed' : 'in-progress';
  }

  function updateStatusOptions(statusSelect, percentage) {
    const inProgressOption = Array.from(statusSelect.options)
      .find(option => option.value === 'in-progress');
    inProgressOption.disabled = percentage === 0;
    if (percentage === 0 && statusSelect.value === 'in-progress') {
      statusSelect.value = 'not-started';
    }
  }

  async function saveProgressTracker(entry) {
    try {
      const res = await fetch(API + '/entries', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: JSON.stringify(entry) })
      });
      if (!res.ok) throw new Error('could not save');
      return true;
    } catch {
      saveError.textContent = 'Could not save. Check the server connection and try again.';
      saveStatus.textContent = '';
      return false;
    }
  }
// Replace the displayed goal with temporary controls so the user can change its information.
  function editProgressGoal(progressGoal, listItem, editButton) {
    const inlineGoalNameInput = document.createElement('input');
    const inlineGoalPercentageInput = document.createElement('input');
    const inlineGoalStatusSelect = document.createElement('select');
    const saveButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const goalName = listItem.querySelector('h4');
    const goalPercentage = listItem.querySelector('[data-goal-percentage]');
    const goalStatus = listItem.querySelector('[data-goal-status]');

    inlineGoalNameInput.type = 'text';
    inlineGoalNameInput.value = progressGoal.name;
    inlineGoalNameInput.setAttribute('aria-label', 'Goal/expectation name');
    inlineGoalPercentageInput.type = 'number';
    inlineGoalPercentageInput.min = '0';
    inlineGoalPercentageInput.max = '100';
    inlineGoalPercentageInput.step = '1';
    inlineGoalPercentageInput.value = String(progressGoal.percentage);
    inlineGoalPercentageInput.setAttribute('aria-label', 'Percentage complete');
    inlineGoalStatusSelect.setAttribute('aria-label', 'Goal/expectation status');
    // Keep the editing choices consistent with the statuses available when creating a goal.
    Array.from(goalStatusSelect.options).forEach(option => {
      const statusOption = document.createElement('option');
      statusOption.value = option.value;
      statusOption.textContent = option.textContent;
      inlineGoalStatusSelect.append(statusOption);
    });
    inlineGoalStatusSelect.value = progressGoal.status;
    inlineGoalPercentageInput.addEventListener('input', () => {
      updateStatusOptions(inlineGoalStatusSelect, Number(inlineGoalPercentageInput.value));
    });
    updateStatusOptions(inlineGoalStatusSelect, progressGoal.percentage);
    saveButton.type = 'button';
    saveButton.textContent = 'Save';
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    goalName.replaceWith(inlineGoalNameInput);
    goalPercentage.replaceWith(inlineGoalPercentageInput);
    goalStatus.replaceWith(inlineGoalStatusSelect);
    editButton.replaceWith(saveButton, cancelButton);
    inlineGoalNameInput.focus();

    cancelButton.addEventListener('click', renderProgressGoals);
    saveButton.addEventListener('click', async () => {
      const trimmedGoalName = inlineGoalNameInput.value.trim();
      const percentage = Number(inlineGoalPercentageInput.value);
      if (trimmedGoalName.length === 0) {
        goalError.textContent = 'Remember to enter a goal or expectation name.';
        inlineGoalNameInput.focus();
        return;
      }
      if (!Number.isInteger(percentage) || percentage < 0 || percentage > 100) {
        percentageError.textContent = 'Percentage complete must be a whole number from 0 to 100.';
        inlineGoalPercentageInput.setAttribute('aria-invalid', 'true');
        inlineGoalPercentageInput.focus();
        return;
      }

      const nextProgressTracker = {
        goals: progressTracker.goals.map(existingGoal => (
          existingGoal.id === progressGoal.id
            ? {
              ...existingGoal,
              name: trimmedGoalName,
              percentage,
              status: percentage === 0 ? inlineGoalStatusSelect.value : getProgressStatus(percentage)
            }
            : existingGoal
        ))
      };
      if (!await saveProgressTracker(nextProgressTracker)) return;

      progressTracker = nextProgressTracker;
      renderProgressGoals();
      goalError.textContent = '';
      saveError.textContent = '';
      saveStatus.textContent = 'Goal/Expectation updated in this browser.';
    });
  }
// Create a new list without the selected goal so the deletion can be saved safely.
  async function deleteProgressGoal(progressGoal) {
    const nextProgressTracker = {
      goals: progressTracker.goals.filter(existingGoal => existingGoal.id !== progressGoal.id)
    };
    if (!await saveProgressTracker(nextProgressTracker)) return;

    progressTracker = nextProgressTracker;
    renderProgressGoals();
    saveError.textContent = '';
    saveStatus.textContent = 'Goal/Expectation deleted from this browser.';
  }

  function renderProgressGoals() {
    notStartedGoalList.replaceChildren();
    inProgressGoalList.replaceChildren();
    completedGoalList.replaceChildren();
    emptyState.hidden = progressTracker.goals.length > 0;
// Filter Goals by their percentage complete so they can be displayed in the correct section of the page.
    const notStartedGoals = progressTracker.goals.filter(progressGoal => progressGoal.percentage === 0);
    const inProgressGoals = progressTracker.goals
      .filter(progressGoal => progressGoal.percentage > 0 && progressGoal.percentage < 100)
      .sort((firstGoal, secondGoal) => secondGoal.percentage - firstGoal.percentage);
    const completedGoals = progressTracker.goals.filter(progressGoal => progressGoal.percentage === 100);

    [...notStartedGoals, ...inProgressGoals, ...completedGoals].forEach(progressGoal => {
      const listItem = document.createElement('li');
      const goalName = document.createElement('h4');
      const goalPercentage = document.createElement('p');
      const goalStatus = document.createElement('p');
      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');
      // Treat user-entered goal names as text rather than allowing them to be interpreted as HTML.
      goalName.textContent = progressGoal.name;
      goalPercentage.textContent = progressGoal.percentage === 100
        ? ''
        : `${progressGoal.percentage}% complete`;
      goalPercentage.dataset.goalPercentage = 'true';
      goalStatus.textContent = statusLabels[progressGoal.status];
      goalStatus.dataset.goalStatus = 'true';
      editButton.type = 'button';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editProgressGoal(progressGoal, listItem, editButton));
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteProgressGoal(progressGoal));
      listItem.append(goalName, goalPercentage, goalStatus, editButton, deleteButton);
      // Keep each marker in the section that matches its percentage state.
      const goalList = progressGoal.percentage === 0
        ? notStartedGoalList
        : progressGoal.percentage === 100
        ? completedGoalList
        : inProgressGoalList;
      goalList.append(listItem);
    });
  }

  goalForm.addEventListener('submit', async event => {
    event.preventDefault();
    const goalName = goalNameInput.value.trim();
    const percentage = Number(goalPercentageInput.value);
    if (goalName.length === 0) {
      goalError.textContent = 'Enter a description/name for your goal or expectation.';
      goalNameInput.setAttribute('aria-invalid', 'true');
      goalNameInput.focus();
      return;
    }
    if (!Number.isInteger(percentage) || percentage < 0 || percentage > 100) {
      percentageError.textContent = 'Percentage complete must be a whole number from 0 to 100.';
      goalPercentageInput.setAttribute('aria-invalid', 'true');
      goalPercentageInput.focus();
      return;
    }

    const progressGoal = {
      id: nextGoalId,
      name: goalName,
      percentage,
      status: percentage === 0 ? goalStatusSelect.value : getProgressStatus(percentage)
    };
    const nextProgressTracker = { goals: [...progressTracker.goals, progressGoal] };
    if (!await saveProgressTracker(nextProgressTracker)) return;

  // Update the saved state before rendering so the page reflects the newly saved marker.
    nextGoalId += 1;
    progressTracker = nextProgressTracker;
    renderProgressGoals();
    goalForm.reset();
    goalError.textContent = '';
    saveError.textContent = '';
    goalNameInput.removeAttribute('aria-invalid');
    goalPercentageInput.removeAttribute('aria-invalid');
    goalNameInput.focus();
    saveStatus.textContent = 'Goal/Expectation saved in this browser.';
  });

  goalPercentageInput.addEventListener('input', () => {
    updateStatusOptions(goalStatusSelect, Number(goalPercentageInput.value));
  });
  async function initialize() {
    progressTracker = await loadProgressTracker();
    nextGoalId = progressTracker.goals.reduce(
      (highestId, progressGoal) => Math.max(highestId, progressGoal.id),
      0
    ) + 1;
    updateStatusOptions(goalStatusSelect, Number(goalPercentageInput.value));
    renderProgressGoals();
  }

  initialize();
})();