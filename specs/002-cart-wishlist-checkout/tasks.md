# Tasks: Cart, Wishlist, and Checkout Functionality

**Input**: Design documents from `/specs/002-cart-wishlist-checkout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below follow the structure from plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for new feature

- [X] T001 Add JWT and security dependencies to backend/pom.xml
- [X] T002 [P] Configure JWT secret and expiration in backend/src/main/resources/application.properties
- [X] T003 [P] Update frontend package.json with new dependencies for auth context

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create User entity in backend/src/main/java/com/guevarra/petstore/entity/User.java
- [X] T005 Create UserRepository in backend/src/main/java/com/guevarra/petstore/repository/UserRepository.java
- [X] T006 [P] Implement JWT authentication service in backend/src/main/java/com/guevarra/petstore/service/AuthService.java
- [X] T007 [P] Create SecurityConfig for JWT in backend/src/main/java/com/guevarra/petstore/config/SecurityConfig.java
- [X] T008 Implement AuthController in backend/src/main/java/com/guevarra/petstore/controller/AuthController.java
- [X] T009 [P] Create AuthContext in frontend/src/contexts/AuthContext.jsx
- [X] T010 [P] Create useAuth hook in frontend/src/hooks/useAuth.js
- [X] T011 [P] Add login/register components in frontend/src/components/Auth/
- [X] T012 Update App.jsx with auth routing and protected routes

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Pets to Cart (Priority: P1) 🎯 MVP

**Goal**: Allow authenticated users to add pets to a shopping cart, view cart contents, and manage quantities

**Independent Test**: Can be fully tested by registering user, adding pets to cart, viewing cart, updating quantities, and verifying persistence across sessions

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 [P] [US1] Contract test for cart API endpoints in backend/src/test/java/com/guevarra/petstore/controller/CartControllerTest.java
- [ ] T014 [P] [US1] Integration test for cart user journey in backend/src/test/java/com/guevarra/petstore/integration/CartIntegrationTest.java

### Implementation for User Story 1

- [X] T015 [P] [US1] Create Cart entity in backend/src/main/java/com/guevarra/petstore/entity/Cart.java
- [X] T016 [P] [US1] Create CartItem entity in backend/src/main/java/com/guevarra/petstore/entity/CartItem.java
- [X] T017 [P] [US1] Create CartRepository in backend/src/main/java/com/guevarra/petstore/repository/CartRepository.java
- [X] T018 [P] [US1] Create CartItemRepository in backend/src/main/java/com/guevarra/petstore/repository/CartItemRepository.java
- [X] T019 [US1] Implement CartService in backend/src/main/java/com/guevarra/petstore/service/CartService.java
- [X] T020 [US1] Implement CartController in backend/src/main/java/com/guevarra/petstore/controller/CartController.java
- [X] T021 [P] [US1] Create cartApi service in frontend/src/services/cartApi.js
- [X] T022 [P] [US1] Create useCart hook in frontend/src/hooks/useCart.js
- [X] T023 [P] [US1] Create CartIcon component in frontend/src/components/CartIcon.jsx
- [X] T024 [P] [US1] Create CartItem component in frontend/src/components/CartItem.jsx
- [X] T025 [US1] Create CartPage in frontend/src/pages/CartPage.jsx
- [X] T026 [US1] Update PetCard to include "Add to Cart" button
- [X] T027 [US1] Update PetDetailPage to include "Add to Cart" button
- [X] T028 [US1] Add cart routing to App.jsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Save Pets to Wishlist (Priority: P2)

**Goal**: Allow authenticated users to save pets to a wishlist for future consideration

**Independent Test**: Can be fully tested by adding pets to wishlist, viewing wishlist contents, and removing items from wishlist

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T029 [P] [US2] Contract test for wishlist API endpoints in backend/src/test/java/com/guevarra/petstore/controller/WishlistControllerTest.java
- [ ] T030 [P] [US2] Integration test for wishlist user journey in backend/src/test/java/com/guevarra/petstore/integration/WishlistIntegrationTest.java

### Implementation for User Story 2

- [X] T031 [P] [US2] Create Wishlist entity in backend/src/main/java/com/guevarra/petstore/entity/Wishlist.java
- [X] T032 [P] [US2] Create WishlistItem entity in backend/src/main/java/com/guevarra/petstore/entity/WishlistItem.java
- [X] T033 [P] [US2] Create WishlistRepository in backend/src/main/java/com/guevarra/petstore/repository/WishlistRepository.java
- [X] T034 [P] [US2] Create WishlistItemRepository in backend/src/main/java/com/guevarra/petstore/repository/WishlistItemRepository.java
- [X] T035 [US2] Implement WishlistService in backend/src/main/java/com/guevarra/petstore/service/WishlistService.java
- [X] T036 [US2] Implement WishlistController in backend/src/main/java/com/guevarra/petstore/controller/WishlistController.java
- [X] T037 [P] [US2] Create wishlistApi service in frontend/src/services/wishlistApi.js
- [X] T038 [P] [US2] Create useWishlist hook in frontend/src/hooks/useWishlist.js
- [X] T039 [P] [US2] Create WishlistIcon component in frontend/src/components/WishlistIcon.jsx
- [X] T040 [P] [US2] Create WishlistItem component in frontend/src/components/WishlistItem.jsx
- [X] T041 [US2] Create WishlistPage in frontend/src/pages/WishlistPage.jsx
- [X] T042 [US2] Update PetCard to include "Add to Wishlist" button
- [X] T043 [US2] Update PetDetailPage to include "Add to Wishlist" button
- [X] T044 [US2] Add wishlist routing to App.jsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Complete Checkout Process (Priority: P3)

**Goal**: Allow authenticated users to complete checkout with order summary and confirmation

**Independent Test**: Can be fully tested by proceeding through checkout with cart items and verifying order creation

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T045 [P] [US3] Contract test for order API endpoints in backend/src/test/java/com/guevarra/petstore/controller/OrderControllerTest.java
- [ ] T046 [P] [US3] Integration test for checkout user journey in backend/src/test/java/com/guevarra/petstore/integration/OrderIntegrationTest.java

### Implementation for User Story 3

- [X] T047 [P] [US3] Create Order entity in backend/src/main/java/com/guevarra/petstore/entity/Order.java
- [X] T048 [P] [US3] Create OrderItem entity in backend/src/main/java/com/guevarra/petstore/entity/OrderItem.java
- [X] T049 [P] [US3] Create OrderRepository in backend/src/main/java/com/guevarra/petstore/repository/OrderRepository.java
- [X] T050 [P] [US3] Create OrderItemRepository in backend/src/main/java/com/guevarra/petstore/repository/OrderItemRepository.java
- [X] T051 [US3] Implement OrderService in backend/src/main/java/com/guevarra/petstore/service/OrderService.java
- [X] T052 [US3] Implement OrderController in backend/src/main/java/com/guevarra/petstore/controller/OrderController.java
- [X] T053 [P] [US3] Create orderApi service in frontend/src/services/orderApi.js
- [X] T054 [P] [US3] Create OrderSummary component in frontend/src/components/OrderSummary.jsx
- [X] T055 [P] [US3] Create CheckoutForm component in frontend/src/components/CheckoutForm.jsx
- [X] T056 [US3] Create CheckoutPage in frontend/src/pages/CheckoutPage.jsx
- [X] T057 [US3] Update CartPage to include "Proceed to Checkout" button
- [X] T058 [US3] Add checkout routing to App.jsx
- [X] T059 [US3] Update OrderService to clear cart after successful order creation

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T060 [P] Update README.md with new feature documentation
- [ ] T061 Code cleanup and refactoring across all new components
- [ ] T062 [P] Performance optimization for cart/wishlist operations
- [ ] T063 [P] Additional unit tests for services in backend/src/test/java/com/guevarra/petstore/service/
- [ ] T064 Security hardening for user data protection
- [ ] T065 Run quickstart.md validation for complete setup
- [ ] T066 Update data.sql with sample users and test data

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May use cart data but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Entities before repositories
- Repositories before services
- Services before controllers
- Backend before frontend
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All entities/repositories for a user story marked [P] can run in parallel
- Frontend components for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all entities/repositories for User Story 1 together:
Task: "Create Cart entity in backend/src/main/java/com/guevarra/petstore/entity/Cart.java"
Task: "Create CartItem entity in backend/src/main/java/com/guevarra/petstore/entity/CartItem.java"
Task: "Create CartRepository in backend/src/main/java/com/guevarra/petstore/repository/CartRepository.java"
Task: "Create CartItemRepository in backend/src/main/java/com/guevarra/petstore/repository/CartItemRepository.java"

# Launch all frontend components for User Story 1 together:
Task: "Create CartIcon component in frontend/src/components/CartIcon.jsx"
Task: "Create CartItem component in frontend/src/components/CartItem.jsx"
Task: "Create cartApi service in frontend/src/services/cartApi.js"
Task: "Create useCart hook in frontend/src/hooks/useCart.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence</content>
<parameter name="filePath">C:\petstore\PetStore\specs\002-cart-wishlist-checkout\tasks.md