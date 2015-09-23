(ns medical.domain.party
  (:require [korma.core :as orm]
            [medical.infra.db :as db]
            [medical.infra.util :as util]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]))

;; Entity
; (declare party party_address)
;
; (orm/defentity party_address
;                (orm/has-one db/address))
;
; (orm/defentity party
;                (orm/has-many party_address))

;; Impl

;; API

; (defn get-profile [party_id]
;   (orm/select party
;               (orm/with party_address)
;               (orm/where {:id party_id})))
;
; (defn update-profile []
;   nil)

;; Resources
(declare party-list-res party-res)
(defresource party-list-res
             :available-media-types ["application/json"]
             :allowed-methods [:get :post :put :delete]
             :handle-ok (fn [ctx] {})
             :put! (fn [ctx] {}))

(defresource party-res
             :available-media-types ["application/json"]
             :allowed-methods [:get :post :put :delete]
             :handle-ok (fn [ctx] {}))

;; Routes
(defroutes routes
           (ANY "/party" request (party-list-res request))
           (ANY "/party/:party_id" request (party-res request)))
