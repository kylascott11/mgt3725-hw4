# FEATURES.md
# Features and specification

Status: ACTIVE. 

## Kano-Classified Feature List

**Classification date:** 9/9/2026

*Feature that is **bolded** is selected feature for HW3.*

| # | Feature | Kano class | Reason from research |
|---|---------|-----------|----------------------|
| 1 |Anonymous Discussion Board| Attractive          | Both interviews compared themselves to others, while neither person mentioned having access to other people's experiences that could reassure them that they weren't alone. An anonymous space would allow users to hear directly from people who have experienced similar situations, providing them more realistic expectations.                  |
| **2** |**Editable Progress Markers**|**Must-be**|**Profile A identified passing his first check ride as an important milestone that would prove to himself he is capable of becoming a pilot. Seeing progress toward meaningful milestones could help him recognize his development rather than focusing only on how far ahead others are.**           |
| 3 |Celebration/Encouragement Notifications|Indifferent           | Profile B already reminds herself that she was accepted, suggesting additional generic reassurance may not resolve the underlying comparison. Profile A's Flight School posts Instagram stories when students pass check-rides and get their licenses, so additional celebration notifications might not contribute much.                  |
| 4 |Personalized Environment Expectations        |   Performance        |   Both profiles felt insecure when their experiences differed from those around them. Profile A compared his flight experience to more experienced coworkers, while Profile B compared her social experience to her roommate and floormates. Providing expectations pulled from existing, reliable resources could give users a reference point based on environmental expectations instead of relying on the people around them to determine what is normal. However, satisfaction for this feature scales with the usefulness and quality of the information provided.               |
| 5 |Performance Benchmarking         |    Reverse       |  Depending on the person, this could be an attractive feature. However, based on my interviews, both Profile A and Profile B  used people around them as benchmarks for whether they were doing well, and both experienced insecurity when they perceived themselves as falling short. Even if I choose the right peer set for them to compare to, providing additional rankings could reinforce the imposter syndrome if they're falling short of the applicable peer set. |
| 6 | Resources Page        |   Performance        |  Profile A is studying beyond what is required to become more knowledgeable and contribute to conversations with coworkers. Profile B seeks out friends with similar experiences for support, suggesting that personalized resources could provide useful information or guidance beyond what they currently have access to. Once again, satisfaction in this case is linked to the quality and usefulness of the provided resources.                  |

## 1. Context

People entering new or unfamiliar environments may have difficulty determining whether they are doing enough to meet their own expectations and the expectations of their environment. They may compare themselves to people around them without knowing whether those people are appropriate benchmarks or whether their own experience is within the expected range. The program helps users identify the expectations of their environment, track their own progress toward those expectations, and access relevant resources so they can better determine where they currently stand.

---

## 2. Users

*The program is designed for users experiencing feelings of being less qualified, behind, or out of place in a changing, new, or unfamiliar environment.*
- [Profile A](USERS.md#profile-a)
- [Profile B](USERS.md#profile-b)

---

## 3. Scope

*Scope statements that are **bolded** are applicable to HW3.*
### This does:
- Identify expectations for their current environment.
- **Record and display their progress toward those expectations.**
- Access resources relevant to their current expectations or areas of improvement.
- View experiences from other people in similar situations without using those experiences as performance standards.

### This deliberately does not do:
- **Determine whether a user is successful or unsuccessful.**
- **Rank users against other individuals.**
- **Tell users how they should feel about their performance.**
- **Guarantee that users will feel more confident or that feelings of imposter syndrome will disappear.**
- **Use generic encouragement as evidence that a user is meeting expectations.**
---

## 4. Behavior

***Bolded** steps are applicable to HW3.*

**1:** Identify the user's situation
- 1. **When a user begins using the program, the system shall prompt the user to identify the environment and situation they want to evaluate.**
- 2. The system shall allow the user to select an environment such as school, work, training, or another relevant environment.
- 3. The system shall allow the user to provide additional information about their current stage or situation within that environment.
- 4. The system shall use the selected environment and situation to determine which expectations and resources to display.

**2:** Display Environment Expectations
- 1. When an environment is identified, the system shall display expectations obtained from an identified external source or uploaded user materials.
- 2. The system shall use information from identified external sources such as official websites, syllabi, handbooks, training materials, or user-uploaded documents.
- 3. The system shall identify the source of each expectation and allow the user to access the original source when available.
- 4. The system shall allow the user to upload materials containing information about expectations for their environment.
- 5. The system shall present expectations based on the user's current environment or stage rather than the performance of a specific individual.
- 6. If reliable information about an expectation is not available, it should indicate that the expectation could not be established.

**3:** Track personal progress
- 1. **When expectations are displayed, the system shall allow the user to create personal progress markers related to those expectations.**
- 2. **Each progress marker shall include a description and a user-selected status.**
- 3. **The user shall be allowed update the status of a progress marker.**
- 4. **The system shall display completed and incomplete progress markers separately.**
- 5. **The system shall not compare the user's progress markers with another user's progress.**

**4:** Provide personalized resources
- 1. When a user identifies an expectation they do not understand or have not yet met, the system shall display resources associated with that expectation when such resources exist.
- 2. Resources may include educational materials, institutional information, guides, or other materials relevant to the user's environment.
- 3. The system shall identify the source of each external resource.
- 4. The system shall allow the user to access the original resource when available.
- 5. If no relevant resource is found, the platform should indicate that no matching resource was found.

**5:** Provide anonymous experiences
- 1. When a user chooses to view other experiences, the platform should display anonymous experiences from users in relevant situations when available.
- 2. The system shall organize experiences by relevant environment or situation based on the user's selection of environment.
- 3. The system shall not present another user's experience as evidence that the current user is meeting or failing to meet expectations.
- 4. The user shall be able to choose whether to view other users' experiences.

**6:** Benchmarking
- 1. **The program shall not display leaderboards or rankings of users.**
- 2. **The program shall not calculate a user's rank relative to other users.**
- 3. When presenting information about other people's experiences, the program shall emphasize differences in experiences rather than rank users by performance.
- 4. If benchmark information is provided, it shall describe environmental expectations or requirements rather than individual user rankings.

---

## 5. Constraints

The program will use reliable information when establishing expectations for an environment and will identify the source of each external expectation or resource when available. The program should distinguish between information obtained from an external source and information generated by the program. Users will not be required to identify themselves, and anonymous experiences will not display personally identifying information to other users. The program will not diagnose users with imposter syndrome or other health conditions and will not present unsupported information as an established expectation. The program shall not require users to compare their performance with another individual and shall use expectations for the user's environment rather than individual peer performance as the primary basis for evaluating progress.

---

## 6. Acceptance Statements Applicable to Progress Markers:
*Made 8 Acceptance statements applicable to HW3 feature with checkable outcomes per HW2 feedback.*
- [ ] **A - 01:** WHEN a user submits a goal/expectation with a non-empty name and a whole-number percentage from 0 to 100, THE SYSTEM SHALL add the goal/expectation to the progress tracker and display the entered name and percentage.

- [ ] **A - 02:** IF a user submits a goal/expectation with an empty name or a percentage outside the range of 0 to 100, THEN THE SYSTEM SHALL prevent the goal/expectation from being saved and display an error message.

- [ ] **A - 03:** WHEN a goal/expectation is displayed, THE SYSTEM SHALL classify it as Not Started at 0%, In Progress from 1% through 99%, or Completed at 100%.

- [ ] **A - 04:** WHEN a user edits an existing goal/expectation and submits a valid name and percentage, THE SYSTEM SHALL save the updated values and display the changes.

- [ ] **A - 05:** WHEN a user views multiple in-progress goals/expectations, THE SYSTEM SHALL display them in descending order by percentage complete.

- [ ] **A - 06:** WHEN a user removes an existing progress marker, THE SYSTEM SHALL remove the marker from the progress tracker and no longer display it.

- [ ] **A - 07:** WHEN a user changes a goal/expectations's percentage to 100%, THE SYSTEM SHALL move the marker from the In Progress section to the Completed section.

- [ ] **A - 08:** WHEN a user reloads the program after saving a goal/expectation, THE SYSTEM SHALL display the previously saved marker with its saved name, percentage, and status.

## Verification
| Criterion | Steps and input | Expected result | Observed result | Status | Evidence / commit |
|---|---|---|---|---|---|
| A - 01 | Enter a progress marker name (goal/expectation) and a whole number percentage between 0–100, then submit. | A new marker appears with the entered name and percentage. |The marker appeared with the entered name and percentage. | PASS | [Add Goal](https://github.com/kylascott11/mgt3745-hw3/commit/1738d8ce0f6bfc273b13fca237dcc040fce2f0fa) |
| A - 02 | Submit a goal/expectation with an invalid percentage or an empty name. | The goal/expectation should not be saved, and a validation error should appear. |Initially, no validation error message appeared for the percentage user input section. After revision, this validation error appeared. | FAIL -> PASS  |[See addition of "const percentageError = document.querySelector('#percentageError');" and other applicable changes.](https://github.com/kylascott11/mgt3745-hw3/commit/1738d8ce0f6bfc273b13fca237dcc040fce2f0fa);|
| A - 03 | Create an in-progress goal/expectation, then change its percentage to a value that changes its progress status. | The goal/expectation marker's status and section should update to reflect the new percentage. | Based on the percentage entered, the marker fell into the in-progress (1-99%), completed (100%), or not started (0%) list.| PASS | [See lines 184-188](https://github.com/kylascott11/mgt3745-hw3/commit/1738d8ce0f6bfc273b13fca237dcc040fce2f0fa) |
| A - 04 | Select an existing goal/expectation marker, change its name and percentage, and save the changes. | The marker should display the updated name and percentage. | The marker displayed the updated information after editing.| PASS| [Save Updates Original Commit](https://github.com/kylascott11/mgt3745-hw3/commit/0836b06a62f744ac859bc4a222b8731a2735adcb) |
| A - 05 | Create multiple in-progress markers with different percentages, such as 25% and 74%. | Markers should appear from highest to lowest percentage complete. | The goal/expectation markers appeared in order on the in-progress list. | PASS | [See "  .sort((firstGoal, secondGoal) => secondGoal.percentage - firstGoal.percentage)](https://github.com/kylascott11/mgt3745-hw3/commit/1738d8ce0f6bfc273b13fca237dcc040fce2f0fa) |
| A - 06 | Create a goal/expectation marker, then select the option to remove it. | The selected goal should be removed and no longer appear in the tracker. | The selected goal was removed from the list. | PASS | [Edit/Delete Functionality Commit](https://github.com/kylascott11/mgt3745-hw3/commit/8e2b314f4ef0bc963b1368398938c96a7bcf536c) |
| <a id="a-07"></a> A - 07 | Change an in-progress goal/expectations' percentage to 100%. | The marker should move from the In Progress section to the Completed section. | Initally, the goal/expectation marker stayed on the in-progres list despite showing 100% completion. After revision, it now reclassifies based on the percentage completion. | FAIL -> PASS | [See" function getProgressStatus(percentage) {return percentage === 100 ? 'completed' : 'in-progress';"](https://github.com/kylascott11/mgt3745-hw3/commit/1738d8ce0f6bfc273b13fca237dcc040fce2f0fa)|
| A - 08 | Create and save a progress marker, then reload the webpage. | The previously saved marker should still appear with its associated status. | The marker remained after the page was reloaded with its saved information. | PASS | [Original Save Implementation](https://github.com/kylascott11/mgt3745-hw3/commit/0836b06a62f744ac859bc4a222b8731a2735adcb) |