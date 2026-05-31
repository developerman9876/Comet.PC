// Comet PC, by @playfab2

declare const Il2Cpp: any;
declare const console: any;
declare const XRNode: any;

const config = (globalThis as any).cfg;
const version = "1.0.3";
let buttonClickDelay = 0.0;
let menu = null;
let reference = null;
let referenceCollider = null;

let leftPrimary = false;
let leftSecondary = false;

let rightPrimary = false;
let rightSecondary = false;

let leftGrab = false;
let rightGrab = false;

let leftTrigger = false;
let rightTrigger = false;

let menuKey = false;

let prevRight = false;
let prevLeft = false;
let prevUp = false;
let prevDown = false;
let prevReturn = false;

let choppableManager = null;
let isGrabbing = false;

let deltaTime = 0.0;
let time = 0.0;
let frameCount = 0;

let buttonSound = 8;
let LerpMenu = false;
let menuscale = 1;

let previousGhostKey = false;
let previousInvisKey = false;
let previousNoclipKey = false;
let perviousTeleportKey = false;

let walkPos = null;
let walkNormal = null;

let previousDash = false;

let closePosition = null;
let tagGunDelay = 0.0;
let idGunDelay = 0.0;
let splashDelay = 0.0;
let lagGunDelay = 0.0;

let lastTime = 0.0;
let oldSlide = null;
let oldGrav = null;

let leftPlatform = null;
let rightPlatform = null;

let selectedButtonIndex = 0;
let flatButtons = [];

let checkpoint = null;
let positions = [];

let lineRenderHolder = null;
let isLineRenderQueued = false;
let linePool = [];

let lvT = null;
let rvT = null;

let buttonNotifications: boolean = true;
let enabledRecent: boolean = false;

let highPunchPower = false;

let espCollide = false;

let didInitPrefabs = false;

let bgColor: [number, number, number, number] = [1.0, 0.5, 0.0, 1.0];
let textColor: [number, number, number, number] = [1.0, 0.7450981, 0.4901961, 1.0];

let buttonColor: [number, number, number, number] = [0.666, 0.333, 0.0, 1.0];
let buttonPressedColor: [number, number, number, number] = [0.333, 0.150, 0.0, 1.0];

let menuName: string = "<b>Comet PC</b>";
let themeIndex = 0;
let buttonIndex = 0;
let favoriteColor = 2;

let currentNotification: string = "";
let notifactionResetTime: number = 0;

const PCEnabled = config.PCMode;

let prefabMap = new Map();
let prefabNameMap = new Map();
const prefabNames: string[] = [];
let prefabIndex = 0;

Il2Cpp.perform(() => {
    const images = {
        "Assembly-CSharp": Il2Cpp.domain.assembly("AnimalCompany").image,
        "UnityEngine.CoreModule": Il2Cpp.domain.assembly("UnityEngine.CoreModule").image,
        "UnityEngine.PhysicsModule": Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image,
        "UnityEngine.UIModule": Il2Cpp.domain.assembly("UnityEngine.UIModule").image,
        "UnityEngine.UI": Il2Cpp.domain.assembly("UnityEngine.UI").image,
        "UnityEngine.TextRenderingModule": Il2Cpp.domain.assembly("UnityEngine.TextRenderingModule").image,
        "Fusion.Runtime": Il2Cpp.domain.assembly("Fusion.Runtime").image,
        "Unity.TextMeshPro": Il2Cpp.domain.assembly("Unity.TextMeshPro").image,
        "UnityEngine.XRModule": Il2Cpp.domain.assembly("UnityEngine.XRModule").image,
        "UnityEngine.InputSystem": Il2Cpp.domain.assembly("Unity.InputSystem").image,
    };

    const AssemblyCSharp = images["Assembly-CSharp"];
    const UnityEngineCore = images["UnityEngine.CoreModule"];
    const UnityEnginePhysics = images["UnityEngine.PhysicsModule"];
    const UnityEngineUI = images["UnityEngine.UI"];
    const UnityEngineUIModule = images["UnityEngine.UIModule"];
    const UnityEngineTextRendering = images["UnityEngine.TextRenderingModule"];
    const FusionRuntime = images["Fusion.Runtime"];
    const UnityTextMeshPro = images["Unity.TextMeshPro"];
    const UnityEngineXRModule = images["UnityEngine.XRModule"];
    const UnityEngineInputSystem = images["UnityEngine.InputSystem"]

    // const ControllerInputPoller = AssemblyCSharp.class("ControllerInputPoller").field("instance").value;
    // const GorillaTaggerClass = AssemblyCSharp.class("GorillaTagger");
    const GTPlayerClass = AssemblyCSharp.class("AnimalCompany.GorillaLocomotion");
    // const VRRig = AssemblyCSharp.class("VRRig");
    // const MonkeAgent = AssemblyCSharp.class("MonkeAgent");
    // const GorillaParentClass = AssemblyCSharp.class("GorillaParent");
    const NetPlayerClass = AssemblyCSharp.class("AnimalCompany.NetPlayer");
    // const NetworkSystemClass = AssemblyCSharp.class("NetworkSystem");
    const GorillaReportButton = AssemblyCSharp.class("AnimalCompany.ComputerTerminalKey");
    // const FreeHoverboardManager = AssemblyCSharp.class("FreeHoverboardManager").method("get_instance").invoke();
    // const GameMode = AssemblyCSharp.class("GorillaGameModes.GameMode");
    // const FriendshipGroupDetection = AssemblyCSharp.class("GorillaTagScripts.FriendshipGroupDetection").method("get_Instance").invoke();
    // const GorillaVelocityTracker = AssemblyCSharp.class("GorillaLocomotion.Climbing.GorillaVelocityTracker");

    const GameObject = UnityEngineCore.class("UnityEngine.GameObject");
    const Object = UnityEngineCore.class("UnityEngine.Object");
    const SystemObject = Il2Cpp.corlib.class("System.Object");
    const Thread = Il2Cpp.corlib.class("System.Threading.Thread");
    const Vector3 = UnityEngineCore.class("UnityEngine.Vector3");
    const Quaternion = UnityEngineCore.class("UnityEngine.Quaternion");
    const Time = UnityEngineCore.class("UnityEngine.Time");
    const Resources = UnityEngineCore.class("UnityEngine.Resources");
    const Material = UnityEngineCore.class("UnityEngine.Material");
    const Renderer = UnityEngineCore.class("UnityEngine.Renderer");
    const Shader = UnityEngineCore.class("UnityEngine.Shader");
    const Color = UnityEngineCore.class("UnityEngine.Color");
    const RectTransform = UnityEngineCore.class("UnityEngine.RectTransform");
    const LineRenderer = UnityEngineCore.class("UnityEngine.LineRenderer");
    const PlayerPrefs = UnityEngineCore.class("UnityEngine.PlayerPrefs");

    const MeshCollider = UnityEnginePhysics.class("UnityEngine.MeshCollider");
    const BoxCollider = UnityEnginePhysics.class("UnityEngine.BoxCollider");
    const SphereCollider = UnityEnginePhysics.class("UnityEngine.SphereCollider");
    const CapsuleCollider = UnityEnginePhysics.class("UnityEngine.CapsuleCollider");
    const Collider = UnityEnginePhysics.class("UnityEngine.Collider");
    const Rigidbody = UnityEnginePhysics.class("UnityEngine.Rigidbody");
    const Physics = UnityEnginePhysics.class("UnityEngine.Physics");
    const Ray = UnityEngineCore.class("UnityEngine.Ray");
    const RaycastHit = UnityEnginePhysics.class("UnityEngine.RaycastHit");

    const Canvas = UnityEngineUIModule.class("UnityEngine.Canvas");
    const CanvasScaler = UnityEngineUI.class("UnityEngine.UI.CanvasScaler");
    const GraphicRaycaster = UnityEngineUI.class("UnityEngine.UI.GraphicRaycaster");
    const Text = UnityEngineUI.class("UnityEngine.UI.Text");
    const Font = UnityEngineTextRendering.class("UnityEngine.Font");

    const TextMeshPro = UnityTextMeshPro.class("TMPro.TextMeshPro");
    
    const InputDevices = UnityEngineXRModule.class("UnityEngine.XR.InputDevices");    
    const CommonUsages = UnityEngineXRModule.class("UnityEngine.XR.CommonUsages");

    const Keyboard = UnityEngineInputSystem.class("UnityEngine.InputSystem.Keyboard");
    const Mouse = UnityEngineInputSystem.class("UnityEngine.InputSystem.Mouse");
    const Gamepad = UnityEngineInputSystem.class("UnityEngine.InputSystem.Gamepad");

    //const GorillaTagger = GorillaTaggerClass.field("_instance").value;
    //const GorillaParent = GorillaParentClass.field("instance").value;
    //const MonkeAgentInst = MonkeAgent.field("instance").value;
    //const NetworkSystem = NetworkSystemClass.field("Instance").value;

    // const LocalRig = GorillaTagger.field("offlineVRRig").value;
    const GTPlayer = GTPlayerClass.field("<Instance>k__BackingField").value;
    const rigidbody = GTPlayer.field("_playerRigidBody").value;
    // const GorillaComputer = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("GorillaNetworking.GorillaComputer").field("instance").value;

    const UberShader = Shader.method("Find").invoke(Il2Cpp.string("Universal Render Pipeline/Unlit"));
    const TextShader = Shader.method("Find").invoke(Il2Cpp.string("GUI/Text Shader"));

    // const GorillaSurfaceOverride = AssemblyCSharp.class("GorillaSurfaceOverride");

    const zeroVector = Vector3.field("zeroVector").value;
    const oneVector = Vector3.field("oneVector").value;
    const identityQuaternion = Quaternion.field("identityQuaternion").value;

    const leftHandTransform = GTPlayer.field("leftHandTransform").value;
    const rightHandTransform = GTPlayer.field("rightHandTransform").value;
    const headCollider = GTPlayer.field("headCollider").value;
    const bodyCollider = GTPlayer.field("bodyCollider").value;

    const punchLastLeft = [zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector];
    const punchLastRight = [zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector];

    let LPrev = Vector3.field("zeroVector").value;
    let RPrev = Vector3.field("zeroVector").value;
    let LVel = Vector3.field("zeroVector").value;
    let RVel = Vector3.field("zeroVector").value;
    let AvgVel = Vector3.field("zeroVector").value;

    let righthand = false;

    const arial = Resources
        .method("GetBuiltinResource", 1)
        .inflate(Font)
        .invoke(Il2Cpp.string("Arial.ttf"));

    function Destroy(object) {
        Object.method("Destroy", 1).invoke(object);
    }

    function getComponent(obj: any, type) {
        return obj.method("GetComponent", 1).inflate(type).invoke();
    }

    function getComponentInParent(obj: any, type) {
        return obj.method("GetComponentInParent", 0).inflate(type).invoke();
    }

    function getComponentInChildren(obj: any, type) {
        return obj.method("GetComponentInChildren", 0).inflate(type).invoke();
    }

    function getComponentDeep(obj: any, type) {
        let comp = getComponent(obj, type);

        if (!comp || comp.handle.isNull()) {
            comp = getComponentInParent(obj, type);
        }

        if (!comp || comp.handle.isNull()) {
            comp = getComponentInChildren(obj, type);
        }

        if (!comp || comp.handle.isNull()) {
            return null;
        }

        return comp;
    }

    function addComponent(obj: any, type) {
        return obj.method("AddComponent", 1).inflate(type).invoke();
    }

    function getOrAddComponent(obj: any, type) {
        let returnType = getComponent(obj, type);
        if (returnType != null && returnType != undefined) {
            return returnType
        }
        return addComponent(obj, type);
    }

    function getObject(obj) {
        return GameObject.method("Find", 1).invoke(Il2Cpp.string(obj));
    }

    function playerIsLocal(player) {
        return player.method("get_IsMine").invoke();
    }

    /* i have no idea if ill be able to bring this back

    function setPlayerName(name) {
        GorillaComputer.field("currentName").value = Il2Cpp.string(name);
        GorillaComputer.field("savedName").value = Il2Cpp.string(name);

        PlayerPrefs.method("SetString").invoke(Il2Cpp.string("playerName"), Il2Cpp.string(name))
        PlayerPrefs.method("Save").invoke();

        PhotonNetwork.method("get_LocalPlayer").invoke().method("set_NickName").invoke(Il2Cpp.string(name));
    }

    function setPlayerColor(color) {
        PlayerPrefs.method("SetFloat").invoke(Il2Cpp.string("redValue"), color[0]);
        PlayerPrefs.method("SetFloat").invoke(Il2Cpp.string("greenValue"), color[1]);
        PlayerPrefs.method("SetFloat").invoke(Il2Cpp.string("blueValue"), color[2]);
        PlayerPrefs.method("Save").invoke();

        GorillaTagger.method("UpdateColor").invoke(color[0], color[1], color[2]);
        const objectArray = Il2Cpp.array(SystemObject, [
            Il2Cpp.reference(color[0], Il2Cpp.Type.Enum.FLOAT),
            Il2Cpp.reference(color[1], Il2Cpp.Type.Enum.FLOAT),
            Il2Cpp.reference(color[2], Il2Cpp.Type.Enum.FLOAT)
        ]);

        const method = GorillaTagger.method("get_myVRRig").invoke().method("SendRPC", 3).overload(
            "System.String",
            "Photon.Pun.RpcTarget",
            "System.Object[]");

        method.invoke(Il2Cpp.string("RPC_InitializeNoobMaterial"), 0, objectArray);
    } */

    function getTransform(obj: any) {
        return obj.method("get_transform").invoke();
    }

    function world2Player(position) {
        position = Vector3.method("op_Subtraction", 2).invoke(position, getTransform(bodyCollider).method("get_position").invoke());
        position = Vector3.method("op_Addition", 2).invoke(position, getTransform(GTPlayer).method("get_position").invoke());
        return position;
    }

    function teleportPlayer(position) {
        // GTPlayer.method("TeleportTo", 3).invoke(world2Player(position), getTransform(GTPlayer).method("get_rotation").invoke(), false);
        AssemblyCSharp.class("AnimalCompany.PlayerController").method("get_instance").invoke().method("Teleport", 2).invoke(world2Player(position), true)
    }

    /* 
    function sendAllOutgoing() {
        MonkeAgentInst.field("rpcErrorMax").value = Number.MAX_SAFE_INTEGER;
        MonkeAgentInst.field("rpcCallLimit").value = Number.MAX_SAFE_INTEGER;
        MonkeAgentInst.field("logErrorMax").value = Number.MAX_SAFE_INTEGER;
        PhotonNetwork.method("set_MaxResendsBeforeDisconnect").invoke(Number.MAX_SAFE_INTEGER);
        PhotonNetwork.method("set_QuickResends").invoke(Number.MAX_SAFE_INTEGER);
        PhotonNetwork.method("SendAllOutgoingCommands").invoke();
    }

    function serialize() {
        PhotonNetwork.method("RunViewUpdate").invoke();
    } */

    function renderMenuText(
        canvasObject,
        text: string = "",
        color: [number, number, number, number] = [1, 1, 1, 1],
        pos = zeroVector,
        size = oneVector
    ) {
        const title = addComponent(createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(canvasObject)), Text);
        title.method("set_text").invoke(Il2Cpp.string(text));
        title.method("set_font").invoke(arial);
        title.method("set_fontSize").invoke(1);
        title.method("set_color").invoke(color);
        title.method("set_fontStyle").invoke(2);
        title.method("set_alignment").invoke(4);
        title.method("set_resizeTextForBestFit").invoke(true);
        title.method("set_resizeTextMinSize").invoke(0);

        const rectTransform = getComponent(title, RectTransform);
        rectTransform.method("set_sizeDelta").invoke(size);
        rectTransform.method("set_position").invoke(pos);
        rectTransform.method("set_rotation").invoke(Quaternion.method("Euler").invoke(180.0, 90.0, 90.0))
    }

    function createMaterial(shader) {
        const material = Material.new();
        return Material.method("CreateWithShader").invoke(material, shader);
    }

    function createObject(
        pos = zeroVector,
        rot = identityQuaternion,
        scale = oneVector,
        primitiveType: number = 3,
        colorArr: [number, number, number, number] = [1, 1, 1, 1],
        parent = null
    ) {
        const obj = GameObject.method("CreatePrimitive").invoke(primitiveType);

        const renderer = getComponent(obj, Renderer);

        if (colorArr[3] == 0) {
            renderer.method("set_enabled").invoke(false);
        } else {
            const material = renderer.method("get_material").invoke(); material.method("set_shader").invoke(UberShader); material.method("set_color").invoke(colorArr);
        }

        const transform = getTransform(obj);
        if (parent != null) {
            transform.method("SetParent", 2).invoke(parent, false);
        }

        transform.method("set_position").invoke(pos);
        transform.method("set_rotation").invoke(rot);
        transform.method("set_localScale").invoke(scale);

        return obj;
    }

    function sendNotification(NotificationText: string = "", requiresReload: boolean = true, clearTime: number = 5) {
        const isOld = (currentNotification == NotificationText);
        notifactionResetTime = time + clearTime;
        currentNotification = NotificationText;
        if (requiresReload && !isOld)
            reloadMenu();
    }

    function createItem(item = "item_treestick", position = rightHandTransform.method("get_position").invoke(), rotation = rightHandTransform.method("get_rotation").invoke()) {
        const newItem = AssemblyCSharp.class("AnimalCompany.PrefabGenerator").method("SpawnItem").invoke(Il2Cpp.string(item), position, rotation, NULL)
        return newItem;
    }

    function createItemWP(item = "item_treestick", position = rightHandTransform.method("get_position").invoke(), rotation = rightHandTransform.method("get_rotation").invoke(), scale = 0, hue = 0, sat = 0) {
        const newItem = AssemblyCSharp.class("AnimalCompany.PrefabGenerator").method("SpawnItem").invoke(Il2Cpp.string(item), position, rotation, NULL)
        return newItem;
    }

    function initPrefabs() {
        if (didInitPrefabs) return;
        const runner = AssemblyCSharp.class("AnimalCompany.PrefabGenerator").field("_instance").value.method("get_runner").invoke();
        if (!runner && runner.handle.isNull()) return;

        const config = runner.method("get_Config").invoke();
        const table = config.field("PrefabTable").value;
        const prefablist = table.method("get_Prefabs").invoke()

        const prefabtotal = prefablist.method("get_Count").invoke()
        for (let i = 0; i < prefabtotal; i++) {
            const prefab = FusionRuntime.class("Fusion.NetworkPrefabId").method("FromIndex").invoke(i)
            const actualprefab = table.method("Load").invoke(prefab, true);
            const actualprefabname = actualprefab.method("get_gameObject").invoke().method("get_name").invoke();
            const cleanName = actualprefabname.toString().replace(/"/g, "");
            if (!cleanName.toLowerCase().includes("item_")) {
                prefabMap.set(i, actualprefab);
                prefabNameMap.set(cleanName, i);
                prefabNames.push(cleanName);
            }
        }

        didInitPrefabs = true;
    }

    function spawnPrefab(prefab = "Basketball", position = null, rotation = null, player = null) {
        const runner = AssemblyCSharp.class("AnimalCompany.PrefabGenerator").field("_instance").value.method("get_runner").invoke();
        if (!runner || runner.handle.isNull()) return;

        if (!didInitPrefabs) initPrefabs();

        const runMethod = runner.method("Spawn").overload(
            "Fusion.NetworkObject",
            "System.Nullable<UnityEngine.Vector3>",
            "System.Nullable<UnityEngine.Quaternion>",
            "System.Nullable<Fusion.PlayerRef>",
            "Fusion.NetworkRunner.OnBeforeSpawned",
            "Fusion.NetworkSpawnFlags"
        );

        let pos = position ? position : rightHandTransform.method("get_position").invoke(),
        rot = rotation ? rotation : rightHandTransform.method("get_rotation").invoke(),
        plr = player ? player : NetPlayerClass.method("get_localPlayer").invoke().method("get_playerRef").invoke();

        const npos = Il2Cpp.nullable(pos),
        nrot = Il2Cpp.nullable(rot),
        nplr = Il2Cpp.nullable(plr);

        const index = prefabNameMap.get(prefab);
        const args = [prefabMap.get(index), npos, nrot, nplr, NULL, 0]
        return runMethod.invoke(...args)
    }

    function renderMenu() {
        menu = createObject(zeroVector, identityQuaternion, [0.1, 0.3, 0.3825], 3, [0, 0, 0, 0]);
        Destroy(getComponent(menu, BoxCollider))

        const menuBackground = createObject([0.1, 0, 0], identityQuaternion, [0.1, 1, 1], 3, bgColor, getTransform(menu))
        Destroy(getComponent(menuBackground, BoxCollider))

        const canvasObject = createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(menu));
        const canvas = addComponent(canvasObject, Canvas);
        Destroy(getComponent(canvasObject, BoxCollider))

        const canvasScaler = addComponent(canvasObject, CanvasScaler);
        addComponent(canvasObject, GraphicRaycaster);
        canvas.method("set_renderMode").invoke(2);
        canvasScaler.method("set_dynamicPixelsPerUnit").invoke(1000.0);

        renderMenuText(canvasObject, menuName + `<color=grey>[</color><color=white>${currentPage + 1}</color><color=grey>]</color>`, textColor, [0.11, 0, 0.175], [1, 0.1]);

        if (time > notifactionResetTime)
            currentNotification = "";
        renderMenuText(canvasObject, currentNotification, textColor, [0.11, 0, 0.275], [1, 0.1]);

        const disconnectButton = createObject([0.1, 0.0, 0.225], identityQuaternion, [0.09, 0.9, 0.08], 3, buttonColor, getTransform(menu));
        disconnectButton.method("set_name").invoke(Il2Cpp.string("@Disconnect"));

        addComponent(disconnectButton, GorillaReportButton);
        getComponent(disconnectButton, BoxCollider).method("set_isTrigger").invoke(true);
        renderMenuText(canvasObject, "Disconnect", textColor, [0.11, 0, 0.225], [1, 0.1]);

        const returnButton = createObject([0.1, -0.175, -0.225], identityQuaternion, [0.09, 0.09, 0.09], 3, buttonColor, getTransform(menu));
        returnButton.method("set_name").invoke(Il2Cpp.string("@GlobalReturn"));

        addComponent(returnButton, GorillaReportButton);
        getComponent(returnButton, BoxCollider).method("set_isTrigger").invoke(true);
        renderMenuText(canvasObject, "<", textColor, [0.11, -0.175, -0.225], [1, 0.1]);

        {
            const pageButton = createObject([0.1, 0.2, 0], identityQuaternion, [0.09, 0.2, 0.9], 3, buttonColor, getTransform(menu));
            pageButton.method("set_name").invoke(Il2Cpp.string("@PreviousPage"));

            addComponent(pageButton, GorillaReportButton);
            getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, "<", textColor, [0.11, 0.2, 0], [1, 0.1]);
        }

        {
            const pageButton = createObject([0.1, -0.2, 0], identityQuaternion, [0.09, 0.2, 0.9], 3, buttonColor, getTransform(menu));
            pageButton.method("set_name").invoke(Il2Cpp.string("@NextPage"));

            addComponent(pageButton, GorillaReportButton);
            getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, ">", textColor, [0.11, -0.2, 0], [1, 0.1]);
        }

        let i = 0;
        const targetMods = buttons[currentCategory]
            .slice(currentPage * 8)
            .slice(0, 8);
        
        const favorited = [];
        buttons[11].forEach((buttonData) => {
            if (buttonData.buttonText != "Exit Favorite Mods")
                favorited.push(buttonData.buttonText);
        });
        const favTextColor: [number, number, number, number] = [
            Math.max( Math.min(textColor[0] + (favoriteColor == 0 ? (+1.0) : 0.2), 1), 0 ),
            Math.max( Math.min(textColor[1] + (favoriteColor == 1 ? (-0.1) : (favoriteColor == 0 ? (-0.1) : 0.2)), 1), 0 ),
            Math.max( Math.min(textColor[2] + (favoriteColor == 2 ? (-0.1) : (favoriteColor == 0 ? (-0.2) : 0.2)), 1), 0 ),
            Math.max( Math.min(textColor[3] + (favoriteColor == 3 ? (-0.7) : 0.0), 1), 0 )
        ]
        
        targetMods.forEach((buttonData, index) => {
            const button = createObject([0.105, 0, 0.13 - (i * 0.04)], identityQuaternion, [0.09, 0.9, 0.08], 3, buttonColor, getTransform(menu));
            button.method("set_name").invoke(Il2Cpp.string("@" + buttonData.buttonText));

            addComponent(button, GorillaReportButton);
            getComponent(button, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, buttonData.buttonText, favorited.includes(buttonData.buttonText) ? favTextColor : textColor, [0.11, 0, 0.13 - (i * 0.04)], [1, 0.1]);
            updateButtonColor(button, buttonData, i);
            i++;
        });
        getTransform(menu).method("set_localScale").invoke(Vector3.method("op_Multiply").invoke(Vector3.method("op_Multiply").invoke(getTransform(menu).method("get_localScale").invoke(), GTPlayer.field("<playerScale>k__BackingField").value), menuscale));
        recenterMenu();
    }

    function renderReference() {
        if (righthand) {
            reference = createObject(zeroVector, identityQuaternion, [0.01, 0.01, 0.01], 0, bgColor, leftHandTransform)
            referenceCollider = getComponent(reference, Collider);

            getTransform(reference).method("set_localPosition").invoke([0.01, -0.117, 0.05]);
            reference.method("set_layer").invoke(2);
            addComponent(reference, Rigidbody).method("set_isKinematic").invoke(true);
        }
        else {
            reference = createObject(zeroVector, identityQuaternion, [0.01, 0.01, 0.01], 0, bgColor, rightHandTransform)
            referenceCollider = getComponent(reference, Collider);

            getTransform(reference).method("set_localPosition").invoke([0.01, -0.117, 0.05]);
            reference.method("set_layer").invoke(2);
            addComponent(reference, Rigidbody).method("set_isKinematic").invoke(true);
        }
    }
    
    function toggleFavorite(info: ButtonInfo) {
        let exists = false;
        for (let index = 0; index < buttons[11].length; index++) {
            const mod = buttons[11][index];
            if (mod.buttonText == info.buttonText)
            {
                exists = true;
                break;
            }
        }
        if (exists) {
            if (info.buttonText == "Exit Favorite Mods")
                return;
            for (let index = 0; index < buttons[11].length; index++) {
                const mod = buttons[11][index];
                if (mod.buttonText == info.buttonText)
                {
                    buttons[11].splice(index, 1);
                    break;
                }
            }
        } else {
            if (info.buttonText == "Exit Favorite Mods")
                return;
            buttons[11].push(info);
        }
    }
    function loadEnabled() {
        buttons[12].splice(1);
        buttons.forEach((buttonList, index) => {
            if (index != 12 && index != 11) {
                buttonList.forEach(button => {
                    if (button.enabled)
                        buttons[12].push(button);
                });
            }
        });
    }

    let gunLocked = false;
    let lockTarget = null;
    let GunPointer = null;
    let GunLine = null;
    function renderGun(overrideLayerMask = null) {
        let StartPosition, Direction
        
        if (PCEnabled) {
            StartPosition = getTransform(headCollider).method("get_position").invoke();
            Direction = getTransform(headCollider).method("get_forward").invoke();
        } else {
            StartPosition = rightHandTransform.method("get_position").invoke();
            Direction = rightHandTransform.method("get_forward").invoke();
        }

        const DirectionDivided = Vector3.method("op_Division").invoke(Direction, 4);
        const rayStartPosition = Vector3.method("op_Addition").invoke(StartPosition, DirectionDivided);

        const layerMask = overrideLayerMask || -3180559;

        const hits = Physics.method("RaycastAll", 4).invoke(
            rayStartPosition,
            Direction,
            512.0,
            layerMask
        );

        // NaN fix incoming

        let finalDistance = 999999;
        let finalRay = null;
        
        try {
            let hitCount = 0;
            for (const hit of hits) {
              hitCount++;
              try {
                  const point = hit.method("get_point").invoke();
                  const distance = Vector3.method("Distance").invoke(point, StartPosition);
                  if (typeof distance === "number" && !isNaN(distance) && distance < finalDistance) {
                      finalRay = hit;
                      finalDistance = distance;
                  }
              } catch (_) {}
          }
        } catch (e) {
            console.log(`oops: ${e}`);
        }

        let EndPosition;
        if (gunLocked) {
            EndPosition = getTransform(lockTarget).method("get_position").invoke();
        } else {
            EndPosition = finalRay.method("get_point").invoke();
        }

        if (Vector3.method("op_Equality").invoke(EndPosition, zeroVector)) {
            const farDirection = Vector3.method("op_Multiply").invoke(Direction, 512);
            EndPosition = Vector3.method("op_Addition").invoke(StartPosition, farDirection);
        }

        if (GunPointer == null) {
            GunPointer = createObject(EndPosition, identityQuaternion, [0.1, 0.1, 0.1], 0, [1, 1, 1, 1]);
        }

        GunPointer.method("SetActive").invoke(true);
        const pointerTransform = getTransform(GunPointer);
        pointerTransform.method("set_position").invoke(EndPosition);

        const PointerRenderer = getComponent(GunPointer, Renderer);
        const material = PointerRenderer.method("get_material").invoke();

        material.method("set_shader").invoke(TextShader);

        const pointerColor = (gunLocked || rightTrigger) ? buttonPressedColor : buttonColor;
        material.method("set_color").invoke(pointerColor);

        const collider = getComponent(GunPointer, Collider);
        if (collider != null) {
            Destroy(collider);
        }

        if (GunLine == null) {
            const lineObj = createObject(zeroVector, identityQuaternion, oneVector, 0, [0, 0, 0, 0]);
            GunLine = addComponent(lineObj, LineRenderer);
        } else {
            GunLine.method("get_gameObject").invoke().method("SetActive").invoke(true);
        }

        const lineMaterial = GunLine.method("get_material").invoke();
        lineMaterial.method("set_shader").invoke(TextShader);

        GunLine.method("set_startColor").invoke(bgColor);
        GunLine.method("set_endColor").invoke(bgColor);

        const lineWidth = 0.025;
        GunLine.method("set_startWidth").invoke(lineWidth);
        GunLine.method("set_endWidth").invoke(lineWidth);

        GunLine.method("set_positionCount").invoke(2);
        GunLine.method("set_useWorldSpace").invoke(true);

        // GunLine.method("set_numCapVertices").invoke(10); doesnt exist (probably stripped)

        GunLine.method("SetPosition").invoke(0, StartPosition);
        GunLine.method("SetPosition").invoke(1, EndPosition);

        if (rightTrigger || gunLocked) {
            const Step = 10;
            GunLine.method("set_positionCount").invoke(Step);
            GunLine.method("SetPosition").invoke(0, StartPosition);

            for (let i = 1; i < (Step - 1); i++) {
                const t = i / (Step - 1);
                const Position = Vector3.method("Lerp").invoke(StartPosition, EndPosition, t);

                const randomValue = Math.random();
                let offset = zeroVector;

                if (randomValue > 0.75) {
                    offset = [
                        (Math.random() * 0.2) - 0.1,
                        (Math.random() * 0.2) - 0.1,
                        (Math.random() * 0.2) - 0.1
                    ];
                }

                const finalPosition = Vector3.method("op_Addition").invoke(Position, offset);
                GunLine.method("SetPosition").invoke(i, finalPosition);
            }

            GunLine.method("SetPosition").invoke(Step - 1, EndPosition);
        }

        return { ray: finalRay, gunPointer: GunPointer };
    }

    function recenterMenu() {
        const menuTransform = getTransform(menu);
        let targetPos, targetRot;

        if (PCEnabled) {
            const headPos = headCollider.method("get_transform").invoke()
                .method("get_position").invoke();
            const headFwd = headCollider.method("get_transform").invoke()
                .method("get_forward").invoke();

            // offset it like 0.5u in front of your face
            const menuPos = Vector3.method("op_Addition").invoke(
                headPos,
                Vector3.method("op_Multiply").invoke(headFwd, 0.8)
            );

            targetPos = menuPos
            targetRot = getTransform(headCollider).method("get_rotation").invoke();
            targetRot = Quaternion.method("op_Multiply").invoke(targetRot, Quaternion.method("Euler").invoke(-90, 0, 90));
        } else if (righthand) {
            targetPos = rightHandTransform.method("get_position").invoke();
            targetRot = rightHandTransform.method("get_rotation").invoke();
            targetRot = Quaternion.method("op_Multiply").invoke(targetRot, Quaternion.method("Euler").invoke(0, 0, 180));
        } else {
            targetPos = leftHandTransform.method("get_position").invoke();
            targetRot = leftHandTransform.method("get_rotation").invoke();
            targetRot = Quaternion.method("op_Multiply").invoke(targetRot, Quaternion.method("Euler").invoke(0, 0, 0));
        }

        if (LerpMenu) {
            const menuPos = menuTransform.method("get_position").invoke();
            const distance = Vector3.method("Distance").invoke(menuPos, zeroVector);
            if (distance < 1) {
                menuTransform.method("set_position").invoke(targetPos);
                menuTransform.method("set_rotation").invoke(targetRot);
            } else {
                const newPos = Vector3.method("Lerp").invoke(menuPos, targetPos, deltaTime * 15);
                menuTransform.method("set_position").invoke(newPos);
                const newRot = Quaternion.method("Slerp").invoke(menuTransform.method("get_rotation").invoke(), targetRot, deltaTime * 15);
                menuTransform.method("set_rotation").invoke(newRot);
            }
        } else {
            menuTransform.method("set_position").invoke(targetPos);
            menuTransform.method("set_rotation").invoke(targetRot);
        }
    }

    function reloadMenu() {
        if (menu != null) {
            Object.method("Destroy", 1).invoke(menu);
            menu = null;
        }
    }

    function updateButtonColor(button, buttonData, index) {
        const RendererClass = Il2Cpp.domain
            .assembly("UnityEngine.CoreModule")
            .image
            .class("UnityEngine.Renderer");

        const renderer = getComponent(button, RendererClass);
        if (!renderer) {
            return;
        }

        if (PCEnabled) {
            const isSelected = index === selectedButtonIndex;
            const material = renderer.method("get_material").invoke();
            material.method("set_color").invoke(isSelected
            ? [1.0, 0.0, 0.0, 1.0]
            : (buttonData.enabled ? buttonPressedColor : buttonColor));
        } else {
            const material = renderer.method("get_material").invoke();
            material.method("set_color").invoke(buttonData.enabled ? buttonPressedColor : buttonColor);
        }
    }

    function playButtonSound() {
        /* 
        LocalRig.method("PlayHandTapLocal").invoke(buttonSound, false, 0.3);
        if (righthand) {
            GorillaTagger.method("StartVibration").invoke(true, 0.5, 0.075);
        }
        else {
            GorillaTagger.method("StartVibration").invoke(false, 0.5, 0.075);
        } */

        const SFXManager = AssemblyCSharp.class("AnimalCompany.SFXManager");
        const NetworkRunner = SFXManager.method("get__currentRunner").invoke();
        SFXManager.method("RPC_PlaySFX").invoke(NetworkRunner, 1, 1, leftHandTransform.method("get_position").invoke(), 1.0);
    }

    function toggleColliders(enabled) {
        const meshColliders = Object.method("FindObjectsOfType").inflate(MeshCollider).invoke();

        for (let i = 0; i < meshColliders.length; i++) {
            const meshCollider = meshColliders.get(i);
            meshCollider.method("set_enabled").invoke(enabled);
        }
    }

    interface ButtonInfoConfig {
        buttonText: string;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        isTogglable?: boolean;
        toolTip?: string;
        enabled?: boolean;
    }

    class ButtonInfo {
        buttonText: string;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        isTogglable: boolean;
        toolTip?: string;
        enabled: boolean;

        constructor(config: ButtonInfoConfig) {
            this.buttonText = config.buttonText;
            this.method = config.method;
            this.enableMethod = config.enableMethod;
            this.disableMethod = config.disableMethod;
            this.isTogglable = config.isTogglable ?? true;
            this.toolTip = config.toolTip ?? null;
            this.enabled = config.enabled ?? false;
        }
    }

    let currentCategory = 0;
    let currentPage = 0;

    const buttons: ButtonInfo[][] = [
        [ // Main [0]
            new ButtonInfo({
                buttonText: "Settings",
                method: () => { currentCategory = 2; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the settings category."
            }),
            new ButtonInfo({
                buttonText: "Favorite Mods",
                method: () => { currentCategory = 11; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens your favorite mods."
            }),
            new ButtonInfo({
                buttonText: "Enabled Mods",
                method: () => { currentCategory = 12; currentPage = 0; loadEnabled() },
                isTogglable: false,
                toolTip: "Opens your enabled mods."
            }),
            new ButtonInfo({
                buttonText: "Movement Mods",
                method: () => { currentCategory = 3; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the movement category."
            }),
            new ButtonInfo({
                buttonText: "Fun Mods",
                method: () => { currentCategory = 4; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the fun category."
            }),
            new ButtonInfo({
                buttonText: "Advantage Mods",
                method: () => { currentCategory = 5; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the advantage category."
            }),
            new ButtonInfo({
                buttonText: "Rig Mods",
                method: () => { currentCategory = 6; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the rig category."
            }),
            new ButtonInfo({
                buttonText: "Misc Mods",
                method: () => { currentCategory = 7; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the misc category."
            }),
            new ButtonInfo({
                buttonText: "Visual Mods",
                method: () => { currentCategory = 8; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the visual category."
            }),
            new ButtonInfo({
                buttonText: "Overpowered Mods",
                method: () => { currentCategory = 9; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the op category."
            }),
            new ButtonInfo({
                buttonText: "Safety Mods",
                method: () => { currentCategory = 10; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the safety category."
            }),
        ],

        [ // Hidden [1]
            new ButtonInfo({
                buttonText: "Disconnect",
                method: () => sendNotification("Not implemented."), //NetworkSystem.method("ReturnToSinglePlayer").invoke(),
                isTogglable: false,
                toolTip: "Disconnects you from the room."
            }),
            new ButtonInfo({
                buttonText: "PreviousPage",
                method: () => {
                    const lastPage = Math.ceil(buttons[currentCategory].length / 8) - 1;

                    currentPage--;
                    if (currentPage < 0)
                        currentPage = lastPage;
                },
                isTogglable: false
            }),
            new ButtonInfo({
                buttonText: "NextPage",
                method: () => {
                    const lastPage = Math.ceil(buttons[currentCategory].length / 8) - 1;

                    currentPage++;
                    currentPage %= lastPage + 1;
                },
                isTogglable: false
            }),
            new ButtonInfo({
                buttonText: "GlobalReturn",
                method: () => {
                    currentCategory = 0;
                    currentPage = 0;
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            })
        ],

        [ // Settings [2]
            new ButtonInfo({
                buttonText: "Exit Settings",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Change Menu Theme",
                method: () => {
                    themeIndex++;
                    themeIndex %= 11;

                    switch (themeIndex) {
                        case 0:
                            bgColor = [1.0, 0.5, 0.0, 1.0];
                            textColor = [1.0, 0.7450981, 0.4901961, 1.0];

                            buttonColor = [0.666, 0.333, 0.0, 1.0];
                            buttonPressedColor = [0.333, 0.150, 0.0, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 1:
                            bgColor = [1.0, 0.0, 0.0, 1.0];
                            textColor = [1.0, 1.0, 1.0, 1.0];

                            buttonColor = [0.0, 0.0, 0.0, 1.0];
                            buttonPressedColor = [1.0, 0.0, 0.0, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 2:
                            bgColor = [0.0, 1.0, 0.0, 1.0];
                            textColor = [1.0, 1.0, 1.0, 1.0];

                            buttonColor = [0.0, 0.0, 0.0, 1.0];
                            buttonPressedColor = [0.0, 1.0, 0.0, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 3:
                            bgColor = [0.0, 0.0, 1.0, 1.0];
                            textColor = [1.0, 1.0, 1.0, 1.0];

                            buttonColor = [0.0, 0.0, 0.0, 1.0];
                            buttonPressedColor = [0.0, 0.0, 1.0, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 4:
                            bgColor = [0.5, 0.0, 0.5, 1.0];
                            textColor = [1.0, 0.9, 1.0, 1.0];

                            buttonColor = [0.25, 0.0, 0.25, 1.0];
                            buttonPressedColor = [0.7, 0.0, 0.7, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 5:
                            bgColor = [0.0, 0.7, 0.7, 1.0];
                            textColor = [1.0, 0.2, 0.8, 1.0];

                            buttonColor = [0.0, 0.3, 0.3, 1.0];
                            buttonPressedColor = [1.0, 0.0, 0.7, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 6:
                            bgColor = [0.9, 0.7, 0.1, 1.0];
                            textColor = [0.0, 0.0, 0.0, 1.0];

                            buttonColor = [0.2, 0.2, 0.2, 1.0];
                            buttonPressedColor = [1.0, 0.84, 0.0, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 7:
                            bgColor = [0.7, 0.9, 1.0, 1.0];
                            textColor = [0.1, 0.2, 0.4, 1.0];

                            buttonColor = [0.5, 0.7, 0.9, 1.0];
                            buttonPressedColor = [0.2, 0.4, 0.8, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 8:
                            bgColor = [0.6, 0.0, 0.0, 1.0];
                            textColor = [1.0, 0.7, 0.2, 1.0];

                            buttonColor = [0.2, 0.0, 0.0, 1.0];
                            buttonPressedColor = [1.0, 0.3, 0.0, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 9:
                            bgColor = [0.05, 0.05, 0.1, 1.0];
                            textColor = [0.6, 0.8, 1.0, 1.0];

                            buttonColor = [0.1, 0.1, 0.2, 1.0];
                            buttonPressedColor = [0.4, 0.6, 1.0, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 10:
                            bgColor = [0.125, 0.125, 0.125, 1.0];
                            textColor = [1.0, 1.0, 0.9, 1.0];

                            buttonColor = [0.111, 0.111, 0.222, 1.0];
                            buttonPressedColor = [0.111, 0.111, 0.67, 1.0];
                            // boardMaterial.method("set_color").invoke(bgColor);
                            break;
                    }
                },
                isTogglable: false,
                toolTip: "Changes the theme of the menu."
            }),
            new ButtonInfo({
                buttonText: "Change Button Sound",
                method: () => {
                    buttonIndex++;
                    buttonIndex %= 5;

                    switch (buttonIndex) {
                        case 0:
                            buttonSound = 8;
                            break;
                        case 1:
                            buttonSound = 66;
                            break;
                        case 2:
                            buttonSound = 67;
                            break;
                        case 3:
                            buttonSound = 84;
                            break;
                        case 4:
                            buttonSound = 106;
                            break;
                        case 5:
                            buttonSound = 189;
                            break;
                    }
                },
                isTogglable: false,
                toolTip: "Changes the button sound."
            }),
            new ButtonInfo({
                buttonText: "Change Favorite Color",
                method: () => {
                    favoriteColor++;
                    favoriteColor %= 4;
                },
                isTogglable: false,
                toolTip: "Changes the text color of favorite mods."
            }),
            new ButtonInfo({
                buttonText: "Change Menu Scale",
                method: () => {
                    menuscale += 0.1;
                    if (menuscale > 1.5) {
                        menuscale = 0.3;
                    }
                },
                isTogglable: false,
                toolTip: "Changes the button sound."
            }),
            new ButtonInfo({
                buttonText: "Freeze Player in Menu",
                enabled: true,
                method: () => {
                    if (menu != null) {
                        if (closePosition == null) {
                            closePosition = getTransform(rigidbody).method("get_position").invoke();
                        }
                        else {
                            getTransform(rigidbody).method("set_position").invoke(closePosition);
                            rigidbody.method("set_linearVelocity").invoke(zeroVector);
                        }
                    } else {
                        closePosition = null;
                    }
                },
                toolTip: "Freezes your character while in the menu."
            }),
            new ButtonInfo({
                buttonText: "Button Notifications",
                enabled: true,
                method: () => buttonNotifications = true,
                disableMethod: () => buttonNotifications = false,
                toolTip: "Shows notifications when clicking menu buttons, may cause lag."
            }),
            new ButtonInfo({
                buttonText: "Enabled Recent",
                method: () => enabledRecent = true,
                disableMethod: () => enabledRecent = false,
                toolTip: "Shows recently disabled mods in enabled mods."
            }),
            new ButtonInfo({
                buttonText: "Right Hand",
                method: () => righthand = true,
                disableMethod: () => righthand = false,
                toolTip: "Lets you switch menu hand."
            }),
            new ButtonInfo({
                buttonText: "Lerp Menu",
                method: () => LerpMenu = true,
                disableMethod: () => LerpMenu = false,
                toolTip: "Makes the menu Lerped."
            }),
            new ButtonInfo({
                buttonText: "High Punch Power",
                enableMethod: () => highPunchPower = true,
                disableMethod: () => highPunchPower = false,
                toolTip: "Makes punch mod more powerful."
            }),
            new ButtonInfo({
                buttonText: "ESP Collisions",
                enableMethod: () => {
                    for (let line of linePool) {
                        Destroy(line.method("get_gameObject").invoke());
                    }
                    linePool = [];
                    espCollide = true
                },
                disableMethod: () => {
                    for (let line of linePool) {
                        Destroy(line.method("get_gameObject").invoke());
                    }
                    linePool = [];
                    espCollide = false
                },
                toolTip: "Makes ESP have collisions."
            }),
        ],

        [ // Movement Mods [3]
            new ButtonInfo({
                buttonText: "Exit Movement Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),

            new ButtonInfo({
                buttonText: "Platforms",
                method: () => {
                    if (leftGrab) {
                        if (leftPlatform == null) {
                            const handTransform = leftHandTransform;
                            leftPlatform = createObject(handTransform.method("get_position").invoke(), handTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, bgColor);
                        }
                    } else {
                        if (leftPlatform != null) {
                            Destroy(leftPlatform);
                            leftPlatform = null;
                        }
                    }

                    if (rightGrab) {
                        if (rightPlatform == null) {
                            const handTransform = rightHandTransform;
                            rightPlatform = createObject(handTransform.method("get_position").invoke(), handTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, bgColor);
                        }
                    } else {
                        if (rightPlatform != null) {
                            Destroy(rightPlatform);
                            rightPlatform = null;
                        }
                    }
                },
                toolTip: "Spawns platforms when pressing grip."
            }),

            new ButtonInfo({
                buttonText: "Trigger Platforms",
                method: () => {
                    if (leftTrigger) {
                        if (leftPlatform == null) {
                            const handTransform = leftHandTransform;
                            leftPlatform = createObject(handTransform.method("get_position").invoke(), handTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, bgColor);
                        }
                    } else {
                        if (leftPlatform != null) {
                            Destroy(leftPlatform);
                            leftPlatform = null;
                        }
                    }

                    if (rightTrigger) {
                        if (rightPlatform == null) {
                            const handTransform = rightHandTransform;
                            rightPlatform = createObject(handTransform.method("get_position").invoke(), handTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, bgColor);
                        }
                    } else {
                        if (rightPlatform != null) {
                            Destroy(rightPlatform);
                            rightPlatform = null;
                        }
                    }
                },
                toolTip: "Spawns platforms when pressing trigger."
            }),

            new ButtonInfo({
                buttonText: "Frozone",
                method: () => {
                    if (leftGrab) {
                        if (leftPlatform == null) {
                            const handTransform = leftHandTransform;
                            leftPlatform = createObject(handTransform.method("get_position").invoke(), handTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, bgColor);
                            // addComponent(leftPlatform, GorillaSurfaceOverride).field("overrideIndex").value = 61;
                        }
                    } else {
                        if (leftPlatform != null) {
                            Destroy(leftPlatform);
                            leftPlatform = null;
                        }
                    }

                    if (rightGrab) {
                        if (rightPlatform == null) {
                            const handTransform = rightHandTransform;
                            rightPlatform = createObject(handTransform.method("get_position").invoke(), handTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, bgColor);
                            // addComponent(rightPlatform, GorillaSurfaceOverride).field("overrideIndex").value = 61;
                        }
                    } else {
                        if (rightPlatform != null) {
                            Destroy(rightPlatform);
                            rightPlatform = null;
                        }
                    }
                },
                toolTip: "Spawns slippy platforms when pressing grip."
            }),

            new ButtonInfo({  
              buttonText: "WASD Fly",
                method: () => {
                    if (!GTPlayer || !rigidbody) return;

                    const kb = Keyboard.method("get_current").invoke()

                    const W = kb.method("get_wKey").invoke().method("get_isPressed").invoke();
                    const A = kb.method("get_aKey").invoke().method("get_isPressed").invoke();
                    const S = kb.method("get_sKey").invoke().method("get_isPressed").invoke();
                    const D = kb.method("get_dKey").invoke().method("get_isPressed").invoke();

                    const Space = kb.method("get_spaceKey").invoke().method("get_isPressed").invoke();
                    const Ctrl = kb.method("get_leftCtrlKey").invoke().method("get_isPressed").invoke();
                    const Shift = kb.method("get_leftShiftKey").invoke().method("get_isPressed").invoke();

                    oldGrav = GTPlayer.field("<currentGravity>k__BackingField").value;
                    GTPlayer.field("<currentGravity>k__BackingField").value = zeroVector;
                    rigidbody.method("set_linearVelocity").invoke(zeroVector)

                    const GTTransform = getTransform(GTPlayer);
                    const headTrans = getTransform(headCollider);
                    const RBTransform = rigidbody.method("get_transform").invoke();

                    const turnSpeed = 250.0
                    const FlySpeed = 5.0
                    const Sensitivity = 15.0

                    const mouse = Mouse.method("get_current").invoke();
                    if (mouse.method("get_rightButton").invoke().method("get_isPressed").invoke() === true) {
                        const delta = mouse.method("get_delta").invoke().method("ReadValue").invoke();
                        const deltaX = delta.field("x").value * Sensitivity * deltaTime;
                        const deltaY = delta.field("y").value * Sensitivity * deltaTime;

                        const Cursor = UnityEngineCore.class("UnityEngine.Cursor");
                        Cursor.method("set_lockState").invoke(1);
                        Cursor.method("set_visible").invoke(false);

                        const euler = headTrans.method("get_eulerAngles").invoke();
                        let rotX = euler.field("x").value;
                        if (rotX > 180) rotX -= 360;
                        let rotY = euler.field("y").value;
                        rotX -= deltaY;
                        rotY += deltaX;
                        rotX = Math.max(-89, Math.min(89, rotX));
                        headTrans.method("set_eulerAngles").invoke([rotX, rotY, 0]);
                    } else {
                        const Cursor = UnityEngineCore.class("UnityEngine.Cursor");
                        Cursor.method("set_lockState").invoke(0);
                        Cursor.method("set_visible").invoke(true);
                    }

                    let speed = FlySpeed;

                    if (Shift)
                        speed *= 2.0;

                    if (W)
                        RBTransform.method("set_position").invoke(Vector3.method("op_Addition").invoke(GTTransform.method("get_position").invoke(), Vector3.method("op_Multiply").invoke(headTrans.method("get_forward").invoke(), (deltaTime * speed))))

                    if (S)
                        RBTransform.method("set_position").invoke(Vector3.method("op_Addition").invoke(GTTransform.method("get_position").invoke(), Vector3.method("op_Multiply").invoke(headTrans.method("get_forward").invoke(), (deltaTime * -speed))))

                    if (A)
                        RBTransform.method("set_position").invoke(Vector3.method("op_Addition").invoke(GTTransform.method("get_position").invoke(), Vector3.method("op_Multiply").invoke(headTrans.method("get_right").invoke(), (deltaTime * -speed))))

                    if (D)
                        RBTransform.method("set_position").invoke(Vector3.method("op_Addition").invoke(GTTransform.method("get_position").invoke(), Vector3.method("op_Multiply").invoke(headTrans.method("get_right").invoke(), (deltaTime * speed))))

                    if (Space)
                        RBTransform.method("set_position").invoke(Vector3.method("op_Addition").invoke(GTTransform.method("get_position").invoke(), [0, deltaTime * speed, 0]))

                    if (Ctrl)
                        RBTransform.method("set_position").invoke(Vector3.method("op_Addition").invoke(GTTransform.method("get_position").invoke(), [0, deltaTime * -speed, 0]))
                },
                disableMethod: () => {
                    GTPlayer.field("<currentGravity>k__BackingField").value = oldGrav
                },
              toolTip: "Turns you into super man. Use X to fly."
            }),

            new ButtonInfo({
                buttonText: "Fly",
                method: () => {
                    if (rightPrimary) {
                        rigidbody.method("set_linearVelocity").invoke(Vector3.field("zeroVector").value);

                        const transform = getTransform(GTPlayer);
                        let forward = getTransform(headCollider).method("get_forward").invoke();

                        let position = transform.method("get_position").invoke();
                        forward = Vector3.method("op_Multiply", 2).invoke(forward, 25.0 * deltaTime);

                        position = Vector3.method("op_Addition", 2).invoke(position, forward);

                        transform.method("set_position").invoke(position);
                    }
                },
                toolTip: "Lets you fly around while holding A."
            }),

            new ButtonInfo({
                buttonText: "Trigger Fly",
                method: () => {
                    if (rightTrigger) {
                        rigidbody.method("set_linearVelocity").invoke(Vector3.field("zeroVector").value);

                        const transform = getTransform(GTPlayer);
                        let forward = getTransform(headCollider).method("get_forward").invoke();

                        let position = transform.method("get_position").invoke();
                        forward = Vector3.method("op_Multiply", 2).invoke(forward, 25.0 * deltaTime);

                        position = Vector3.method("op_Addition", 2).invoke(position, forward);

                        transform.method("set_position").invoke(position);
                    }
                },
                toolTip: "Lets you fly around while holding trigger."
            }),

            new ButtonInfo({
                buttonText: "Hand Fly",
                method: () => {
                    if (rightPrimary) {
                        const mulQV = Quaternion.methods.find(m =>
                            m.name === "op_Multiply" &&
                            m.parameterCount === 2 &&
                            m.parameters[1].type.name.endsWith("Vector3")
                        ); // chatgpt no orhweer way to find this

                        rigidbody.method("set_linearVelocity").invoke(Vector3.field("zeroVector").value);

                        const transform = getTransform(GTPlayer);
                        const vrot = Quaternion.method("op_Multiply", 2).invoke(rightHandTransform.method("get_rotation").invoke(), GTPlayer.field("rightHand").field("handRotOffset").value);
                        const vfor = Vector3.method("get_forward").invoke();
                        let forward = mulQV.invoke(vrot, vfor);

                        let position = transform.method("get_position").invoke();
                        forward = Vector3.method("op_Multiply", 2).invoke(forward, 25.0 * deltaTime);

                        position = Vector3.method("op_Addition", 2).invoke(position, forward);

                        transform.method("set_position").invoke(position);
                    }
                },
                toolTip: "Lets you fly around with your hand while holding A."
            }),

            new ButtonInfo({
                buttonText: "Slow Time",
                method: () => {
                    const speed = -0.15;
                    let disp = Vector3.method("op_Addition", 2).invoke(rigidbody.method("get_linearVelocity").invoke(), Physics.method("get_gravity").invoke());
                    disp = Vector3.method("op_Multiply", 2).invoke(disp, Time.method("get_fixedDeltaTime").invoke() * speed);
                    rigidbody.method("MovePosition").invoke(Vector3.method("op_Addition", 2).invoke(rigidbody.method("get_position").invoke(), disp))
                },
                toolTip: "Slows down physics."
            }),

            new ButtonInfo({
                buttonText: "Quick Time",
                method: () => {
                    const speed = 0.15;
                    let disp = Vector3.method("op_Addition", 2).invoke(rigidbody.method("get_linearVelocity").invoke(), Physics.method("get_gravity").invoke());
                    disp = Vector3.method("op_Multiply", 2).invoke(disp, Time.method("get_fixedDeltaTime").invoke() * speed);
                    rigidbody.method("MovePosition").invoke(Vector3.method("op_Addition", 2).invoke(rigidbody.method("get_position").invoke(), disp))
                },
                toolTip: "Speeds up physics."
            }),

            new ButtonInfo({
                buttonText: "Up And Down",
                method: () => {
                    if (rightTrigger && rightGrab) {
                        rigidbody.method("set_linearVelocity").invoke(Vector3.field("zeroVector").value);
                    }
                    if (rightTrigger && !rightGrab) {
                        rigidbody.method("AddForce").invoke(Vector3.field("upVector").value, 175 * deltaTime);
                    }
                    if (!rightTrigger && rightGrab) {
                        rigidbody.method("AddForce").invoke(Vector3.field("downVector").value, 175 * deltaTime);
                    }
                },
                toolTip: "Makes you go up when holding trigger, and down when holding grip."
            }),

            new ButtonInfo({
                buttonText: "Size Changer",
                disableMethod: () => {
                    GTPlayer.field("<playerScale>k__BackingField").value = 1;
                    // getTransform(LocalRig).method("set_localScale").invoke(Vector3.field("one").value.method("op_Multiply").invoke(LocalRig.field("NativeScale").value));
                },
                method: () => {
                    if (rightTrigger) {
                        GTPlayer.field("<playerScale>k__BackingField").value += 0.01;
                        // getTransform(LocalRig).method("set_localScale").invoke(Vector3.field("one").value.method("op_Multiply").invoke(LocalRig.field("NativeScale").value));
                    }
                    if (leftTrigger) {
                        GTPlayer.field("<playerScale>k__BackingField").value -= 0.01;
                        // getTransform(LocalRig).method("set_localScale").invoke(Vector3.field("one").value.method("op_Multiply").invoke(LocalRig.field("NativeScale").value));
                    }
                },
                toolTip: "Makes you able to change size with triggers."
            }),

            new ButtonInfo({
                buttonText: "Checkpoint",
                disableMethod: () => {
                    if (checkpoint != null) {
                        Destroy(checkpoint);
                        checkpoint = null;
                    }
                },
                method: () => {
                    if (rightGrab && !rightPrimary) {
                        if (checkpoint == null) {
                            const handTransform = rightHandTransform;
                            checkpoint = createObject(handTransform.method("get_position").invoke(), identityQuaternion, [0.2, 0.2, 0.2], 3, bgColor);
                            Destroy(getComponent(checkpoint, BoxCollider));
                        } else {
                            const handTransform = rightHandTransform;
                            checkpoint.method("get_transform").invoke().method("set_position").invoke(handTransform.method("get_position").invoke())
                        }
                    }
                    if (rightPrimary) {
                        if (checkpoint != null) {
                            teleportPlayer(checkpoint.method("get_transform").invoke().method("get_position").invoke())
                            rigidbody.method("set_linearVelocity").invoke(zeroVector);
                        }
                    }
                },
                toolTip: "Place a checkpoint with grip and teleport to it with A."
            }),

            new ButtonInfo({
                buttonText: "Rewind",
                disableMethod: () => {
                    positions = [];
                },
                method: () => {
                    if (rightTrigger) {
                        const pos = positions[positions.length - 1];

                        teleportPlayer(pos[0]);
                        leftHandTransform.method("set_position").invoke(pos[1]);
                        rightHandTransform.method("set_position").invoke(pos[2]);
                        leftHandTransform.method("set_rotation").invoke(pos[3]);
                        rightHandTransform.method("set_rotation").invoke(pos[4]);
                        rigidbody.method("set_linearVelocity").invoke(pos[5]);

                        positions.pop();
                    } else {
                        positions.push([
                            bodyCollider.method("get_transform").invoke().method("get_position").invoke(),

                            leftHandTransform.method("get_position").invoke(),
                            rightHandTransform.method("get_position").invoke(),
                            
                            leftHandTransform.method("get_rotation").invoke(),
                            rightHandTransform.method("get_rotation").invoke(),

                            rigidbody.method("get_linearVelocity").invoke()
                        ]);
                        if (positions.length > 8640) {
                            positions.shift();
                        }
                    }
                },
                toolTip: "Brings you back in time when holding trigger."
            }),

            new ButtonInfo({
                buttonText: "No Tag Freeze",
                method: () => GTPlayer.field("disableMovement").value = false,
                toolTip: "Disables tag freeze on your character.",
            }),

            new ButtonInfo({
                buttonText: "Low Gravity",
                method: () => {
                    const force = Vector3.method("op_Multiply", 2).invoke(Vector3.field("upVector").value, (deltaTime * (6.66 / deltaTime)));
                    rigidbody.method("AddForce", 2).invoke(force, 5);
                },
                toolTip: "Makes gravity lower on your character."
            }),

            new ButtonInfo({
                buttonText: "Zero Gravity",
                method: () => {
                    const force = Vector3.method("op_Multiply", 2).invoke(Vector3.field("upVector").value, (deltaTime * (9.81 / deltaTime)));
                    rigidbody.method("AddForce", 2).invoke(force, 5);
                },
                toolTip: "Makes gravity lower on your character."
            }),

            new ButtonInfo({
                buttonText: "High Gravity",
                method: () => {
                    const force = Vector3.method("op_Multiply", 2).invoke(Vector3.field("downVector").value, (deltaTime * (7.77 / deltaTime)));
                    rigidbody.method("AddForce", 2).invoke(force, 5);
                },
                toolTip: "Makes gravity higher on your character."
            }),

            /* doesnt work atm :(

            new ButtonInfo({
                buttonText: "Weak Wall Walk",
                method: () => {
                    if (GTPlayer.method("IsHandTouching").invoke(true) || GTPlayer.method("IsHandTouching").invoke(false)) {
                        const ray = GTPlayer.field("lastHitInfoHand").value;
                        walkPos = ray.method("get_point").invoke();
                        walkNormal = ray.method("get_normal").invoke();
                    }
                    if (walkPos != Vector3.field("zeroVector").value && rightGrab) {
                        const force = Vector3.method("op_Multiply", 2).invoke(walkNormal, -5);
                        rigidbody.method("AddForce").invoke(force, 5);
                        const zeroForce = Vector3.method("op_Multiply", 2).invoke(Vector3.field("upVector").value, (deltaTime * (9.81 / deltaTime)));
                        rigidbody.method("AddForce", 2).invoke(zeroForce, 5);
                    }
                },
                toolTip: "Makes you get brought towards any wall you touch when holding grip, but weaker."
            }),

            new ButtonInfo({
                buttonText: "Wall Walk",
                method: () => {
                    if (GTPlayer.method("IsHandTouching").invoke(true) || GTPlayer.method("IsHandTouching").invoke(false)) {
                        const ray = GTPlayer.field("lastHitInfoHand").value;
                        walkPos = ray.method("get_point").invoke();
                        walkNormal = ray.method("get_normal").invoke();
                    }
                    if (walkPos != Vector3.field("zeroVector").value && rightGrab) {
                        const force = Vector3.method("op_Multiply", 2).invoke(walkNormal, -9.81);
                        rigidbody.method("AddForce").invoke(force, 5);
                        const zeroForce = Vector3.method("op_Multiply", 2).invoke(Vector3.field("upVector").value, (deltaTime * (9.81 / deltaTime)));
                        rigidbody.method("AddForce", 2).invoke(zeroForce, 5);
                    }
                },
                toolTip: "Makes you get brought towards any wall you touch when holding grip."
            }), */

            new ButtonInfo({
                buttonText: "Teleport Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const gunPointer = gunData.gunPointer;

                        if (rightTrigger && !perviousTeleportKey) {
                            teleportPlayer(getTransform(gunPointer).method("get_position").invoke())
                            rigidbody.method("set_linearVelocity").invoke(zeroVector);
                        }

                        perviousTeleportKey = rightTrigger;
                    }
                },
                toolTip: "Teleports you to wherever your hand desires."
            }),

            new ButtonInfo({
                buttonText: "Airstrike Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const gunPointer = gunData.gunPointer;

                        if (rightTrigger && !perviousTeleportKey) {
                            teleportPlayer(Vector3.method("op_Addition", 2).invoke([0, 30, 0], getTransform(gunPointer).method("get_position").invoke()))
                            rigidbody.method("set_linearVelocity").invoke(zeroVector);
                        }

                        perviousTeleportKey = rightTrigger;
                    }
                },
                toolTip: "Teleports you to wherever your hand desires, except farther up, then launches you back down."
            }),

            new ButtonInfo({
                buttonText: "Airstrike Random",
                method: () => {
                    const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                    const vrrigtotal = vrrigs.method("get_Count").invoke();
                    const playerRig = vrrigs.method("get_Item").invoke(Math.floor(Math.random() * vrrigtotal));
                    teleportPlayer(Vector3.method("op_Addition", 2).invoke([0, 30, 0], getTransform(playerRig).method("get_position").invoke()));
                    rigidbody.method("set_linearVelocity").invoke(zeroVector);
                },
                isTogglable: false,
                toolTip: "Teleports you to a random player, except farther up, then launches you back down."
            }),

            new ButtonInfo({
                buttonText: "Teleport To Random",
                method: () => {
                    const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                    const vrrigtotal = vrrigs.method("get_Count").invoke();
                    const playerRig = vrrigs.method("get_Item").invoke(Math.floor(Math.random() * vrrigtotal));
                    teleportPlayer(getTransform(playerRig).method("get_position").invoke());
                    rigidbody.method("set_linearVelocity").invoke(zeroVector);
                },
                isTogglable: false,
                toolTip: "Teleports you to a random player."
            }),

            new ButtonInfo({
                buttonText: "Dash",
                method: () => {
                    if (rightPrimary && !previousDash) {
                        const leftRightVector = getTransform(headCollider).method("get_forward").invoke();
                        const leftForce = Vector3.method("op_Multiply", 2).invoke(leftRightVector, 10.0);
                        rigidbody.method("AddForce", 2).invoke(leftForce, 2);
                    }
                    previousDash = rightPrimary;
                },
                toolTip: "Flings your character forwards when pressing A."
            }),

            new ButtonInfo({
                buttonText: "Iron Man",
                method: () => {
                    if (leftPrimary) {
                        const leftRightVector = leftHandTransform.method("get_right").invoke();
                        const leftForce = Vector3.method("op_Multiply", 2).invoke(leftRightVector, -15.0 * deltaTime);
                        rigidbody.method("AddForce", 2).invoke(leftForce, 2);
                    }
                    if (rightPrimary) {
                        const leftRightVector = rightHandTransform.method("get_right").invoke();
                        const leftForce = Vector3.method("op_Multiply", 2).invoke(leftRightVector, 15.0 * deltaTime);
                        rigidbody.method("AddForce", 2).invoke(leftForce, 2);
                    }
                },
                toolTip: "Turns you into iron man. Use A and X to fly."
            }),

            new ButtonInfo({
                buttonText: "Noclip",
                method: () => {
                    if (rightTrigger && !previousNoclipKey) {
                        toggleColliders(false);
                    }

                    if (!rightTrigger && previousNoclipKey) {
                        toggleColliders(true);
                    }

                    previousNoclipKey = rightTrigger;
                },
                toolTip: "Lets you clip through objects while holding right trigger."
            }),

            new ButtonInfo({
                buttonText: "Legit Long Arms",
                method: () => {
                    getTransform(GTPlayer).method("set_localScale").invoke([1.08, 1.08, 1.08]);
                },
                disableMethod: () => {
                    getTransform(GTPlayer).method("set_localScale").invoke(oneVector);
                },
                toolTip: "Gives you Slightly longer arms."
            }),

            new ButtonInfo({
                buttonText: "Long Arms",
                method: () => {
                    getTransform(GTPlayer).method("set_localScale").invoke([1.25, 1.25, 1.25]);
                },
                disableMethod: () => {
                    getTransform(GTPlayer).method("set_localScale").invoke(oneVector);
                },
                toolTip: "Gives you longer arms."
            }),

            new ButtonInfo({
                buttonText: "Speed Boost",
                method: () => {
                    GTPlayer.field("maxJumpSpeed").value = 9.0;
                    GTPlayer.field("jumpMultiplier").value = 1.5;
                },
                toolTip: "Gives you a speed boost."
            }),

            new ButtonInfo({
                buttonText: "Slide Control",
                enableMethod: () => {
                    // i think its defaultSlideFactor idk
                    oldSlide = GTPlayer.field("defaultSlideFactor").value;
                    GTPlayer.field("defaultSlideFactor").value = 1;
                },
                disableMethod: () => GTPlayer.field("slideControl").value = oldSlide,
                toolTip: "Lets you control yourself on ice perfectly."
            }),

            /* if only we had a velocity tracker
            new ButtonInfo({
                buttonText: "Predictions",
                enableMethod: () => {
                    lvT = createObject(zeroVector, identityQuaternion, zeroVector, 0, [0.0, 0.0, 0.0, 0.0]);
                    Destroy(getComponent(lvT, BoxCollider))
                    addComponent(lvT, GorillaVelocityTracker);

                    rvT = createObject(zeroVector, identityQuaternion, zeroVector, 0, [0.0, 0.0, 0.0, 0.0]);
                    Destroy(getComponent(rvT, BoxCollider))
                    addComponent(rvT, GorillaVelocityTracker);
                },
                method: () => {
                    let predCount = 0.02;

                    getTransform(lvT).method("set_position").invoke(Vector3.method("op_Subtraction", 2).invoke(getTransform(headCollider).method("get_position").invoke(), leftHandTransform.method("get_position").invoke()));
                    getTransform(rvT).method("set_position").invoke(Vector3.method("op_Subtraction", 2).invoke(getTransform(headCollider).method("get_position").invoke(), rightHandTransform.method("get_position").invoke()));

                    let leftHandPosition = leftHandTransform.method("get_position").invoke();
                    let rightHandPosition = rightHandTransform.method("get_position").invoke();

                    let leftHandVelocity = getComponent(lvT, GorillaVelocityTracker).method("GetAverageVelocity").invoke(true, 0.0, false);
                    let rightHandVelocity = getComponent(rvT, GorillaVelocityTracker).method("GetAverageVelocity").invoke(true, 0.0, false);

                    leftHandVelocity = Vector3.method("op_Multiply", 2).invoke(leftHandVelocity, predCount);
                    rightHandVelocity = Vector3.method("op_Multiply", 2).invoke(rightHandVelocity, predCount);

                    leftHandPosition = Vector3.method("op_Subtraction", 2).invoke(leftHandPosition, leftHandVelocity);
                    rightHandPosition = Vector3.method("op_Subtraction", 2).invoke(rightHandPosition, rightHandVelocity);

                    leftHandTransform.method("set_position").invoke(leftHandPosition);
                    rightHandTransform.method("set_position").invoke(rightHandPosition);
                },
                disableMethod: () => {
                    Destroy(lvT);
                    Destroy(rvT);
                },
                toolTip: "Gives your controllers higher predictions."
            }), */
        ],

        [ // Fun Mods [4]
            new ButtonInfo({
                buttonText: "Exit Fun Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),

            new ButtonInfo({
                buttonText: "Prefab++",
                method: () => {
                    prefabIndex++;
                    console.log(prefabNames[prefabIndex])
                    sendNotification(prefabNames[prefabIndex])
                },
                isTogglable: false,
                toolTip: "Spawns a prefab."
            }),
            new ButtonInfo({
                buttonText: "Prefab--",
                method: () => {
                    prefabIndex--;
                    console.log(prefabNames[prefabIndex])
                    sendNotification(prefabNames[prefabIndex])
                },
                isTogglable: false,
                toolTip: "Spawns a prefab."
            }),
            new ButtonInfo({
                buttonText: "Spawn Prefab",
                method: () => {
                    spawnPrefab(prefabNames[prefabIndex]);
                },
                isTogglable: false,
                toolTip: "Spawns a prefab."
            }),

            new ButtonInfo({
                buttonText: "Prefab Minigun",
                method: () => {
                    if(!rightGrab) return;

                    if (time > lagGunDelay) {
                        lagGunDelay = time + 0.1;
                        const proj = spawnPrefab(prefabNames[prefabIndex], rightHandTransform.method("get_position").invoke(), rightHandTransform.method("get_rotation").invoke());

                        if(proj) {
                            const rigid = getComponent(proj, Rigidbody)
                            if (rigid) {
                                if (rightTrigger) {
                                    rigid.method("set_useGravity").invoke(false)
                                }
                                const velocity = Vector3.method("op_Multiply").invoke(rightHandTransform.method("get_forward").invoke(), 20);
                                rigid.method("set_linearVelocity").invoke(velocity)
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Spawns a prefab."
            }),

            new ButtonInfo({
                buttonText: "Grab Tree",
                method: () => {
                    if (!rightGrab) {
                        isGrabbing = false;
                        choppableManager = null;
                        return;
                    }
                    if (!isGrabbing || !choppableManager) {
                        const pos = Vector3.new().unbox()
                        pos.method(".ctor").invoke(0, 1000, 0)
                        const manager = spawnPrefab("ChoppableTreeManager", pos);
                        console.log("manager:", manager);
                        choppableManager = getComponentDeep(manager, AssemblyCSharp.class("AnimalCompany.ChoppableTreeManager"))
                        console.log("choppableManager:", choppableManager);
                        isGrabbing = true;
                    }
                    if (!choppableManager) return;
                    const handPos = rightHandTransform.method("get_position").invoke();
                    const rot = rightHandTransform.method("get_rotation").invoke();
                    choppableManager.method("RPC_SpawnTree", 5).invoke(2, 90, handPos, rot, 40);
                },
                isTogglable: true,
                toolTip: "Grabs and spawns a tree."
            }),

            new ButtonInfo({
                buttonText: "Zipline Spam (Raycast)",
                method: () => {
                    if (!rightGrab) return;
                    const zipline = spawnPrefab("SpawnableZipline", rightHandTransform.method("get_position").invoke(), rightHandTransform.method("get_rotation").invoke())
                    const layerMask = -134221825;

                    let hits = [];
                    try {
                        hits = Physics.method("RaycastAll", 4).invoke(
                            Vector3.method("op_Addition").invoke(rightHandTransform.method("get_position").invoke(), Vector3.method("op_Division").invoke(rightHandTransform.method("get_forward").invoke(), 4)),
                            rightHandTransform.method("get_forward").invoke(),
                            512.0,
                            layerMask
                        );
                    } catch (e) {
                        console.log(`threw: ${e}`);
                    }
                
                    let finalDistance = 999999;
                    let finalRay = null;
                
                    try {
                        let hitCount = 0;
                        for (const hit of hits) {
                          hitCount++;
                          try {
                              const point = hit.method("get_point").invoke();
                              const distance = Vector3.method("Distance").invoke(point, rightHandTransform.method("get_position").invoke());
                              if (typeof distance === "number" && !isNaN(distance) && distance < finalDistance) {
                                  finalRay = hit;
                                  finalDistance = distance;
                              }
                          } catch (_) {}
                      }
                    } catch (e) {
                        console.log(`iteration threw: ${e}`);
                    }

                    getComponentDeep(zipline, AssemblyCSharp.class("AnimalCompany.SpawnableZipline")).method("Setup").invoke(rightHandTransform.method("get_position").invoke(), finalRay.method("get_point").invoke())
                },
                isTogglable: true,
                toolTip: "Grabs and spawns a tree."
            }),

            new ButtonInfo({
                buttonText: "Zipline Spam (Force)",
                method: () => {
                    if (!rightGrab) return;
                    const zipline = spawnPrefab("SpawnableZipline", rightHandTransform.method("get_position").invoke(), rightHandTransform.method("get_rotation").invoke());
                    const offset = Vector3.method("op_Addition").invoke(rightHandTransform.method("get_position").invoke(), Vector3.method("op_Multiply").invoke(rightHandTransform.method("get_forward").invoke(), 500))
                    getComponentDeep(zipline, AssemblyCSharp.class("AnimalCompany.SpawnableZipline")).method("Setup").invoke(rightHandTransform.method("get_position").invoke(), offset)
                },
                isTogglable: true,
                toolTip: "Grabs and spawns a tree."
            }),

            new ButtonInfo({
                buttonText: "Spawn Teleport Pad",
                method: () => {
                    spawnPrefab("TeleportMachine", getTransform(bodyCollider).method("get_position").invoke(), identityQuaternion);
                    spawnPrefab("TeleportationManager", getTransform(bodyCollider).method("get_position").invoke(), identityQuaternion);
                },
                isTogglable: false,
                toolTip: "Spawns a prefab."
            }),

            new ButtonInfo({
                buttonText: "Attach Player Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const ray = gunData.ray;

                        if (rightTrigger) {
                            const gunTarget = getComponentInParent(ray.method("get_collider").invoke(), NetPlayerClass);
                            if (gunTarget && !gunTarget.handle.isNull() && time > lagGunDelay) {
                                if (!playerIsLocal(gunTarget)) {
                                    lagGunDelay = time + 0.5;
                                    const momblock = spawnPrefab("MomToyBlockObject", getTransform(bodyCollider).method("get_position").invoke(), identityQuaternion);
                                    if (!momblock || momblock.handle.isNull()) {
                                        console.log("null prefab?")
                                        return;
                                    }
                                    const momblockcomponent = getComponent(momblock, AssemblyCSharp.class("AnimalCompany.MomToyBlockObject"));
                                    if (momblockcomponent || !momblockcomponent.handle.isNull()) {
                                        momblockcomponent.method("RPC_SetActive").invoke(true)
                                        const grable = momblockcomponent.method("get_grabbable").invoke()
                                        if (grable || !grable.handle.isNull()) {
                                            grable.method("set_scaleModifier").invoke(-127)
                                        }
                                    } else {
                                        console.log("null comp")
                                        return;
                                    }
                                    // RPC_AttachTo(System.Boolean attach, Fusion.NetworkObject objectToAttachTo, System.Boolean moveToTransformImmediately, UnityEngine.Vector3 offset); // 0x0087e9c0
                                    gunTarget.method("RPC_AttachTo").invoke(true, momblock, true, zeroVector);

                                    const grable = getComponent(momblock, AssemblyCSharp.class("AnimalCompany.GrabbableObject"))
                                    if (grable || !grable.handle.isNull()) {
                                        grable.method("set_scaleModifier").invoke(-128)
                                    }
                                }
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Attachs whoever your hand desires to an object."
            }),

            new ButtonInfo({
                buttonText: "Send Away Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const ray = gunData.ray;

                        if (rightTrigger) {
                            const gunTarget = getComponentInParent(ray.method("get_collider").invoke(), NetPlayerClass);
                            if (gunTarget && !gunTarget.handle.isNull() && time > lagGunDelay) {
                                if (!playerIsLocal(gunTarget)) {
                                    lagGunDelay = time + 0.5;
                                    const proj = spawnPrefab("RobotDogRPG", rightHandTransform.method("get_position").invoke(), rightHandTransform.method("get_rotation").invoke());

                                    if(proj) {
                                        const comp = getComponent(proj, AssemblyCSharp.class("AnimalCompany.RPGRocket"))
                                        if (comp) {
                                            comp.field("_acceleration").value = 0
                                            const TickTimer = FusionRuntime.class("Fusion.TickTimer");
                                            const runner = getComponent(proj, FusionRuntime.class("Fusion.NetworkObject")).method("get_Runner").invoke()
                                            const timer = TickTimer.method("CreateFromSeconds").invoke(runner, 1000);
                                            comp.method("set__lifeTmr").invoke(timer);
                                        }
                                        const rigid = getComponent(proj, Rigidbody)
                                        if (rigid) {
                                            rigid.method("set_useGravity").invoke(false)
                                            const velocity = Vector3.method("op_Multiply").invoke(rightHandTransform.method("get_forward").invoke(), 50);
                                            rigid.method("set_linearVelocity").invoke(velocity)
                                        }
                                    }
                                    // RPC_AttachTo(System.Boolean attach, Fusion.NetworkObject objectToAttachTo, System.Boolean moveToTransformImmediately, UnityEngine.Vector3 offset); // 0x0087e9c0
                                    gunTarget.method("RPC_AttachTo").invoke(true, proj, true, zeroVector);
                                }
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Tags whoever your hand desires."
            }),

            new ButtonInfo({
                buttonText: "Small Mom Block",
                method: () => {
                    const momblock = spawnPrefab("MomToyBlockObject", getTransform(bodyCollider).method("get_position").invoke(), identityQuaternion);
                    if (!momblock || momblock.handle.isNull()) {
                        console.log("null prefab?")
                        return;
                    }
                    const momblockcomponent = getComponent(momblock, AssemblyCSharp.class("AnimalCompany.MomToyBlockObject"));
                    if (momblockcomponent || !momblockcomponent.handle.isNull()) {
                        momblockcomponent.method("RPC_SetActive").invoke(true)
                        const grable = momblockcomponent.method("get_grabbable").invoke()
                        if (grable || !grable.handle.isNull()) {
                            grable.method("set_scaleModifier").invoke(-127)
                        }
                    } else {
                        console.log("null comp")
                        return;
                    }
                },
                isTogglable: false,
                toolTip: "Spawns a prefab."
            }),

            new ButtonInfo({
                buttonText: "Mom Block",
                method: () => {
                    const momblock = spawnPrefab("MomToyBlockObject", getTransform(bodyCollider).method("get_position").invoke(), identityQuaternion);
                    if (!momblock || momblock.handle.isNull()) {
                        console.log("null prefab?")
                        return;
                    }
                    const momblockcomponent = getComponent(momblock, AssemblyCSharp.class("AnimalCompany.MomToyBlockObject"));
                    if (momblockcomponent || !momblockcomponent.handle.isNull()) {
                        momblockcomponent.method("RPC_SetActive").invoke(true)
                    } else {
                        console.log("null comp")
                        return;
                    }
                },
                isTogglable: false,
                toolTip: "Spawns a prefab."
            }),

            new ButtonInfo({
                buttonText: "Custom Mom Block",
                method: () => {
                    const momblock = spawnPrefab("MomToyBlockObject", getTransform(bodyCollider).method("get_position").invoke(), identityQuaternion);
                    if (!momblock || momblock.handle.isNull()) {
                        console.log("null prefab?")
                        return;
                    }
                    const momblockcomponent = getComponent(momblock, AssemblyCSharp.class("AnimalCompany.MomToyBlockObject"));
                    if (momblockcomponent || !momblockcomponent.handle.isNull()) {
                        momblockcomponent.method("RPC_SetActive").invoke(true)
                        // Drop(UnityEngine.Vector3 position, System.Single angle, AnimalCompany.MomToyBlockObject.BlockShape shape, AnimalCompany.MomToyBlockObject.BlockColor color, System.Single dropForce);
                        momblockcomponent.method("Drop").invoke(getTransform(bodyCollider).method("get_position").invoke(), 0, 3, 4, 1)
                    } else {
                        console.log("null comp")
                        return;
                    }
                },
                isTogglable: false,
                toolTip: "Spawns a prefab."
            }),

            new ButtonInfo({
                buttonText: "Giant Mom Block",
                method: () => {
                    const momblock = spawnPrefab("MomToyBlockObject", getTransform(bodyCollider).method("get_position").invoke(), identityQuaternion);
                    if (!momblock || momblock.handle.isNull()) {
                        console.log("null prefab?")
                        return;
                    }
                    const momblockcomponent = getComponent(momblock, AssemblyCSharp.class("AnimalCompany.MomToyBlockObject"));
                    if (momblockcomponent || !momblockcomponent.handle.isNull()) {
                        momblockcomponent.method("RPC_SetActive").invoke(true)
                        const grable = momblockcomponent.method("get_grabbable").invoke()
                        if (grable || !grable.handle.isNull()) {
                            grable.method("set_scaleModifier").invoke(127)
                        }
                    } else {
                        console.log("null comp")
                        return;
                    }
                },
                isTogglable: false,
                toolTip: "Spawns a prefab."
            }),

            new ButtonInfo({
                buttonText: "RPG Out Of Head",
                method: () => {
                    if (rightGrab) {
                        spawnPrefab("RPGRocket", getTransform(headCollider).method("get_position").invoke(), getTransform(headCollider).method("get_rotation").invoke())
                    }
                },
                isTogglable: true,
                toolTip: "Spawns a prefab."
            }),
            new ButtonInfo({
                buttonText: "Spawn Items",
                method: () => {
                    if (!rightGrab) return;
                    createItem()
                },
                isTogglable: true,
                toolTip: "Spawns items."
            }),

            new ButtonInfo({
                buttonText: "Spawn Items Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const ray = gunData.ray

                        if (rightTrigger) {
                            createItem(undefined, ray.method("get_point").invoke())
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Spawns items."
            }),
            /*
            new ButtonInfo({
                buttonText: "Spawn Hoverboard",
                method: () => {
                    GTPlayer.method("SetHoverAllowed").invoke(true, true)
                    FreeHoverboardManager.method("SendDropBoardRPC").invoke(rightHandTransform.method("get_position").invoke(), identityQuaternion, zeroVector, zeroVector, bgColor);
                },
                isTogglable: false,
                toolTip: "Spawns you in a hoverboard."
            }),
            new ButtonInfo({
                buttonText: "Become Goldentrophy",
                method: () => {
                    setPlayerName("goldentrophy");
                    setPlayerColor([1.0, 0.5, 0.0]);
                },
                isTogglable: false,
                toolTip: "Turns you into goldentrophy."
            }),
            new ButtonInfo({
                buttonText: "Water Splash Hands",
                method: () => {
                    if (leftGrab && time > splashDelay) {
                        splashDelay = time + 0.1;
                        const objectArray = Il2Cpp.array(SystemObject, [leftHandTransform.method("get_position").invoke(), leftHandTransform.method("get_rotation").invoke(), 1.0, 0.5, true, false]);

                        const method = GorillaTagger.method("get_myVRRig").invoke().method("SendRPC", 3).overload(
                            "System.String",
                            "Photon.Pun.RpcTarget",
                            "System.Object[]");

                        method.invoke(Il2Cpp.string("RPC_PlaySplashEffect"), 0, objectArray);
                    }
                    if (rightGrab && time > splashDelay) {
                        splashDelay = time + 0.1;
                        const objectArray = Il2Cpp.array(SystemObject, [rightHandTransform.method("get_position").invoke(), rightHandTransform.method("get_rotation").invoke(), 1.0, 0.5, true, false]);

                        const method = GorillaTagger.method("get_myVRRig").invoke().method("SendRPC", 3).overload(
                            "System.String",
                            "Photon.Pun.RpcTarget",
                            "System.Object[]");

                        method.invoke(Il2Cpp.string("RPC_PlaySplashEffect"), 0, objectArray);
                    }
                },
                toolTip: "Splashes water on your hands when pressing your grips."
            }), */
            new ButtonInfo({
                buttonText: "Get ID Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const ray = gunData.ray;

                        if (rightTrigger) {
                            const gunTarget = getComponentInParent(ray.method("get_collider").invoke(), NetPlayerClass);
                            if (gunTarget && !gunTarget.handle.isNull() && time > idGunDelay) {
                                if (!playerIsLocal(gunTarget)) {
                                    idGunDelay = time + 0.5;
                                    const id = gunTarget.field("_userID").value;
                                    sendNotification("ID: " + id);
                                }
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Logs the ID of whoever your hand desires."
            }),
            /* 
            new ButtonInfo({
                buttonText: "Get Platform Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const ray = gunData.ray;

                        if (rightTrigger) {
                            const gunTarget = getComponentInParent(ray.method("get_collider").invoke(), NetPlayerClass);
                            if (gunTarget && !gunTarget.handle.isNull() && time > idGunDelay) {
                                if (!playerIsLocal(gunTarget)) {
                                    idGunDelay = time + 0.5;
                                    const player = gunTarget.method("get_Creator").invoke();
                                    const concat = String(gunTarget.field("concatStringOfCosmeticsAllowed").value);
                                    const isSteam = (concat.includes("S. FIRST LOGIN") || concat.includes("FIRST LOGIN")) && !concat.includes("LMAKT.");
                                    sendNotification(isSteam ? "PLATFORM: Steam" : "PLATFORM: Meta");
                                }
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Logs the platform of whoever your hand desires."
            }), */
            new ButtonInfo({
                buttonText: "Punch Mod",
                method: () => {
                    // This is MORE optimized (BY A LOT) than the one in the steam menu.
                    const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                    const vrrigtotal = vrrigs.method("get_Count").invoke();
                    let index = 0;
                    for (let i = 0; i < vrrigtotal; i++) {
                        const vrrig = vrrigs.method("get_Item").invoke(i);
                        index++;
                        let they = vrrig.field("rightHandTransform").value.method("get_position").invoke();
                        const notthem = getTransform(headCollider).method("get_position").invoke();
                        let distance = Vector3.method("Distance").invoke(they, notthem);
                        if (distance < 0.25) {
                            const vel = Vector3.method("op_Addition", 2).invoke(Vector3.method("op_Multiply").invoke(Vector3.method("Normalize").invoke(Vector3.method("op_Subtraction", 2).invoke(they, punchLastRight[index])), highPunchPower ? 10 : 5), rigidbody.method("get_linearVelocity").invoke());
                            rigidbody.method("set_linearVelocity").invoke(vel);
                        }
                        punchLastRight[index] = they;
                        they = vrrig.field("leftHandTransform").value.method("get_position").invoke();
                        distance = Vector3.method("Distance").invoke(they, notthem);
                        if (distance < 0.25) {
                            const vel = Vector3.method("op_Addition", 2).invoke(Vector3.method("op_Multiply").invoke(Vector3.method("Normalize").invoke(Vector3.method("op_Subtraction", 2).invoke(they, punchLastLeft[index])), highPunchPower ? 10 : 5), rigidbody.method("get_linearVelocity").invoke());
                            rigidbody.method("set_linearVelocity").invoke(vel);
                        }
                        punchLastLeft[index] = they;
                    }
                },
                toolTip: "Lets people punch you across the map."
            }),
            /* 
            new ButtonInfo({
                buttonText: "Max Quest Score",
                method: () => {
                    LocalRig.method("SetQuestScore")?.invoke(999999)
                },
                isTogglable: false,
                toolTip: "Sets Your Quest Score To Max"
            }),
            new ButtonInfo({
                buttonText: "Max Ranked Level",
                method: () => {
                    LocalRig.method("SetRankedInfo", 4)?.invoke(4000.0, 7, 7, true);
                },
                isTogglable: false,
                toolTip: "Sets Your Ranked Level To Max"
            }), */
        ],

        [ // Advantage Mods [5]
            new ButtonInfo({
                buttonText: "Exit Advantage Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),

            new ButtonInfo({
                buttonText: "Hand Noclip",
                method: () => {
                    GTPlayer.field("_disableHandCollisions").value = true;
                },
                disableMethod: () => {
                    GTPlayer.field("_disableHandCollisions").value = false;
                },
                toolTip: "Disables hand collisions."
            }),

            new ButtonInfo({
                buttonText: "Stinky Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const ray = gunData.ray;

                        if (rightTrigger) {
                            const gunTarget = getComponentInParent(ray.method("get_collider").invoke(), NetPlayerClass);
                            if (gunTarget && !gunTarget.handle.isNull() && time > tagGunDelay) {
                                if (!playerIsLocal(gunTarget)) {
                                    tagGunDelay = time + 0.5;
                                    /*
                                    LocalRig.method("set_enabled").invoke(false);
                                    getTransform(LocalRig).method("set_position").invoke(getTransform(gunTarget).method("get_position").invoke());
                                    serialize();
                                    GameMode.method("ReportTag").invoke(gunTarget.method("get_Creator").invoke());
                                    LocalRig.method("set_enabled").invoke(true);
                                    sendAllOutgoing();
                                    */
                                    gunTarget.method("RPC_TagAsStinky").invoke();
                                }
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Tags whoever your hand desires."
            }),

            new ButtonInfo({
                buttonText: "Tag All",
                isTogglable: false,
                method: () => {
                    const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                    const vrrigtotal = vrrigs.method("get_Count").invoke();
                    for (let i = 0; i < vrrigtotal; i++) {
                        const playerRig = vrrigs.method("get_Item").invoke(i);
                        if (!playerIsLocal(playerRig)) {
                            /*
                            LocalRig.method("set_enabled").invoke(false);
                            getTransform(LocalRig).method("set_position").invoke(getTransform(playerRig).method("get_position").invoke());
                            serialize();
                            GameMode.method("ReportTag").invoke(playerRig.method("get_Creator").invoke());
                            LocalRig.method("set_enabled").invoke(true);
                            sendAllOutgoing();
                            */
                            playerRig.method("RPC_TagAsStinky").invoke()
                        }
                    }
                },
                toolTip: "Tags everyone"
            }),

            new ButtonInfo({
                buttonText: "72 FPS",
                method: () => {
                    const targetDelta = 1 / 72;
                    const elapsed = Time.method("get_realtimeSinceStartup").invoke() - lastTime;
                    if (elapsed < targetDelta) {
                        const sleepMs = Math.floor((targetDelta - elapsed) * 1000);
                        if (sleepMs > 0)
                            Thread.method("Sleep").invoke(sleepMs);
                    }
                    lastTime = Time.method("get_realtimeSinceStartup").invoke();
                },
                isTogglable: true,
                toolTip: "Caps your FPS at 72 frames per second."
            }),

            new ButtonInfo({
                buttonText: "60 FPS",
                method: () => {
                    const targetDelta = 1 / 60;
                    const elapsed = Time.method("get_realtimeSinceStartup").invoke() - lastTime;
                    if (elapsed < targetDelta) {
                        const sleepMs = Math.floor((targetDelta - elapsed) * 1000);
                        if (sleepMs > 0)
                            Thread.method("Sleep").invoke(sleepMs);
                    }
                    lastTime = Time.method("get_realtimeSinceStartup").invoke();
                },
                isTogglable: true,
                toolTip: "Caps your FPS at 60 frames per second."
            }),

            new ButtonInfo({
                buttonText: "45 FPS",
                method: () => {
                    const targetDelta = 1 / 45;
                    const elapsed = Time.method("get_realtimeSinceStartup").invoke() - lastTime;
                    if (elapsed < targetDelta) {
                        const sleepMs = Math.floor((targetDelta - elapsed) * 1000);
                        if (sleepMs > 0)
                            Thread.method("Sleep").invoke(sleepMs);
                    }
                    lastTime = Time.method("get_realtimeSinceStartup").invoke();
                },
                isTogglable: true,
                toolTip: "Caps your FPS at 45 frames per second."
            }),
        ],
        [ // Rig Mods [6]
            new ButtonInfo({
                buttonText: "Exit Rig Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            
            /*

            i'll do these when i feel like it

            new ButtonInfo({
                buttonText: "Disable Wind",
                enableMethod: () => { // yes, this is the placement of the mod in the steam menu. correct category and all.
                    getObject("Environment Objects/LocalObjects_Prefab/Forest/Environment/Forest_ForceVolumes/").method("SetActive").invoke(false);
                },
                disableMethod: () => {
                    getObject("Environment Objects/LocalObjects_Prefab/Forest/Environment/Forest_ForceVolumes/").method("SetActive").invoke(true);
                },
                toolTip: "Freezes your rig when pressing A."
            }),

            new ButtonInfo({
                buttonText: "Ghost",
                method: () => {
                    if (rightPrimary && !previousGhostKey) {
                        LocalRig.method("set_enabled").invoke(!LocalRig.method("get_enabled").invoke());
                    }
                    previousGhostKey = rightPrimary;
                },
                toolTip: "Freezes your rig when pressing A."
            }),

            new ButtonInfo({
                buttonText: "Invisible",
                method: () => {
                    if (rightSecondary && !previousInvisKey) {
                        LocalRig.method("set_enabled").invoke(!LocalRig.method("get_enabled").invoke());
                    }
                    if (!LocalRig.method("get_enabled").invoke()) {
                        getTransform(LocalRig).method("set_position").invoke([0, -99999, 0]);
                    }
                    previousInvisKey = rightSecondary;

                },
                toolTip: "Turns you invisible when pressing B."
            }),
            new ButtonInfo({
                buttonText: "Rig Gun",
                disableMethod: () => {
                    LocalRig.method("set_enabled").invoke(true);
                },
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const gunPointer = gunData.gunPointer;

                        if (rightTrigger) {
                            LocalRig.method("set_enabled").invoke(false);
                            const position = Vector3.method("op_Addition", 2).invoke([0, 1, 0], getTransform(gunPointer).method("get_position").invoke());
                            getTransform(LocalRig).method("set_position").invoke(position);
                        } else {
                            LocalRig.method("set_enabled").invoke(true);
                        }
                    }
                },
                toolTip: "Moves your rig to wherever your hand desires."
            }),
            new ButtonInfo({
                buttonText: "Grab Rig",
                disableMethod: () => { LocalRig.method("set_enabled").invoke(true); },
                method: () => {
                    if (rightGrab) {
                        LocalRig.method("set_enabled").invoke(false);
                        getTransform(LocalRig).method("set_position").invoke(rightHandTransform.method("get_position").invoke());
                        getTransform(LocalRig).method("set_rotation").invoke(rightHandTransform.method("get_rotation").invoke());
                    }
                    else {
                        LocalRig.method("set_enabled").invoke(true);
                    }
                    if (leftGrab) {
                        LocalRig.method("set_enabled").invoke(false);
                        getTransform(LocalRig).method("set_position").invoke(leftHandTransform.method("get_position").invoke());
                        getTransform(LocalRig).method("set_rotation").invoke(leftHandTransform.method("get_rotation").invoke());
                    }
                    else {
                        LocalRig.method("set_enabled").invoke(true);
                    }
                },
                isTogglable: true,
                toolTip: "Lets you grab your rig"
            }),
            new ButtonInfo({
                buttonText: "Spaz Rig",
                method: () => {
                    const trackingRotationOffset = LocalRig.field("head").value.field("trackingRotationOffset").value;
                    trackingRotationOffset.field("x").value = Math.random() * 360.0;
                    trackingRotationOffset.field("y").value = Math.random() * 360.0;
                    trackingRotationOffset.field("z").value = Math.random() * 360.0;
                },
                disableMethod: () => {
                    const trackingRotationOffset = LocalRig.field("head").value.field("trackingRotationOffset").value;
                    trackingRotationOffset.field("x").value = 0.0;
                    trackingRotationOffset.field("y").value = 0.0;
                    trackingRotationOffset.field("z").value = 0.0;
                },
                toolTip: "Spazzes your rig out."
            }),
            new ButtonInfo({
                buttonText: "Spin Head X",
                method: () => {
                    const trackingRotationOffset = LocalRig.field("head").value.field("trackingRotationOffset").value;
                    trackingRotationOffset.field("x").value += 15.0;
                },
                disableMethod: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("x").value = 0.0;
                },
                toolTip: "Rotate head around the X axis."
            }),

            new ButtonInfo({
                buttonText: "Spin Head Y",
                method: () => {
                    const trackingRotationOffset = LocalRig.field("head").value.field("trackingRotationOffset").value;
                    trackingRotationOffset.field("y").value += 15.0;
                },
                disableMethod: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("y").value = 0.0;
                },
                toolTip: "Rotate head around the Y axis."
            }),

            new ButtonInfo({
                buttonText: "Spin Head Z",
                method: () => {
                    const trackingRotationOffset = LocalRig.field("head").value.field("trackingRotationOffset").value;
                    trackingRotationOffset.field("z").value += 15.0;
                },
                disableMethod: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("z").value = 0.0;
                },
                toolTip: "Rotate head around the Z axis."
            }),
            new ButtonInfo({
                buttonText: "Upside Down Head",
                method: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("z").value = 180.0;
                },
                disableMethod: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("z").value = 0.0;
                },
                toolTip: "Flip your head upside down."
            }),

            new ButtonInfo({
                buttonText: "Broken Neck",
                method: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("z").value = 90.0;
                },
                disableMethod: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("z").value = 0.0;
                },
                toolTip: "Tilt your head sideways."
            }),

            new ButtonInfo({
                buttonText: "Backwards Head",
                method: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("y").value = 180.0;
                },
                disableMethod: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("y").value = 0.0;
                },
                toolTip: "Turn your head backwards."
            }),

            new ButtonInfo({
                buttonText: "Sideways Head",
                method: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("y").value = 90.0;
                },
                disableMethod: () => {
                    LocalRig.field("head").value.field("trackingRotationOffset").value.field("y").value = 0.0;
                },
                toolTip: "Rotate your head sideways."
            }),
            */
        ],
        [ // Misc Mods [7]
            new ButtonInfo({
                buttonText: "Exit Misc Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            /* 
            new ButtonInfo({
                buttonText: "Connect to US",
                method: () => {
                    PhotonNetwork.method("ConnectToRegion").invoke(Il2Cpp.string("us"));
                },
                isTogglable: false,
                toolTip: "Connects you to the US region."
            }),

            new ButtonInfo({
                buttonText: "Connect to US West",
                method: () => {
                    PhotonNetwork.method("ConnectToRegion").invoke(Il2Cpp.string("usw"));
                },
                isTogglable: false,
                toolTip: "Connects you to the USW rwgion."
            }),

            new ButtonInfo({
                buttonText: "Connect to EU",
                method: () => {
                    PhotonNetwork.method("ConnectToRegion").invoke(Il2Cpp.string("eu"));
                },
                isTogglable: false,
                toolTip: "Connects you to the EU region."
            }),
            */
        ],
        [ // Visual Mods [8]
            new ButtonInfo({
                buttonText: "Exit Visual Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            /*
            new ButtonInfo({
                buttonText: "Cosmetic Tracers",
                disableMethod: () => {
                    for (let line of linePool) {
                        line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                    }
                },
                method: () => {
                    if (frameCount % 5 != 0) {
                        for (let line of linePool) {
                            line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                        }
                        const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                        const vrrigtotal = vrrigs.method("get_Count").invoke();
                        const rigs = [];
                        const cosmeticRigs = [];
                        for (let i = 0; i < vrrigtotal; i++) {
                            const playerRig = vrrigs.method("get_Item").invoke(i);
                            rigs.push(playerRig);
                            if (playerIsLocal(playerRig)) continue;
                            const concat = String(playerRig.field("concatStringOfCosmeticsAllowed").value);
                            if (concat.includes("LBAAD.")) { cosmeticRigs.push(i); continue; }; // Admin
                            if (concat.includes("LBAAK.")) { cosmeticRigs.push(i); continue; }; // Stick
                            if (concat.includes("LMAPY.")) { cosmeticRigs.push(i); continue; }; // Forest Guide
                            if (concat.includes("LBAGS.")) { cosmeticRigs.push(i); continue; }; // Illustrator
                            if (concat.includes("LBADE.")) { cosmeticRigs.push(i); continue; }; // Finger Painter
                            if (concat.includes("LBANI.")) { cosmeticRigs.push(i); continue; }; // AA Creator
                        }
                        for (let i = 0; i < vrrigtotal; i++) {
                            if (cosmeticRigs.includes(i) == false) continue;
                            const playerRig = rigs[i];
                            if (!playerIsLocal(playerRig)) {
                                const color = playerRig.field("playerColor").value;
                                if (lineRenderHolder == null) {
                                    lineRenderHolder = GameObject.new("LineRender_Holder");
                                }
                                let finalRender = null;
                                let nl = false;
                                for (let line of linePool) {
                                    if (finalRender != null) continue;
                                    if (line.method("get_gameObject").invoke().method("get_activeInHierarchy").invoke() == false) {
                                        line.method("get_gameObject").invoke().method("SetActive").invoke(true);
                                        finalRender = line;
                                        break;
                                    }
                                }
                                if (finalRender == null) {
                                    nl = true;
                                    const lineHolder = GameObject.new("LineObject");
                                    getTransform(lineHolder).method("set_parent").invoke(getTransform(lineRenderHolder));
                                    const newLine = addComponent(lineHolder, LineRenderer);
                                    const shader = Shader.method("Find").overload("System.String").invoke(Il2Cpp.string("GUI/Text Shader"));
                                    newLine.method("get_material").invoke().method("set_shader").invoke(shader);
                                    newLine.method("set_startWidth").invoke(0.025);
                                    newLine.method("set_endWidth").invoke(0.025);
                                    newLine.method("get_gameObject").invoke().method("SetActive").invoke(true);
                                    newLine.method("set_useWorldSpace").invoke(true);
                                    newLine.method("get_gameObject").invoke().method("set_layer").invoke(lineRenderHolder.method("get_layer").invoke());
                                    linePool.push(newLine);
                                    finalRender = newLine;
                                }
                                finalRender.method("set_startColor").invoke(color);
                                finalRender.method("set_endColor").invoke(color);
                                finalRender.method("SetPosition").invoke(1, getTransform(playerRig).method("get_position").invoke());
                                finalRender.method("SetPosition").invoke(0, rightHandTransform.method("get_position").invoke());
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Puts tracers on your right hand. Only shows players with rare cosmetics."
            }),
            */
            new ButtonInfo({
                buttonText: "Casual Tracers",
                disableMethod: () => {
                    for (let line of linePool) {
                        line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                    }
                },
                method: () => {
                    if (frameCount % 3 == 0) {
                        for (let line of linePool) {
                            line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                        }
                        const rhp = rightHandTransform.method("get_position").invoke();
                        const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                        const vrrigtotal = vrrigs.method("get_Count").invoke();
                        for (let i = 0; i < vrrigtotal; i++) {
                            const playerRig = vrrigs.method("get_Item").invoke(i);
                            if (!playerIsLocal(playerRig)) {
                                const color = playerRig.field("playerColor").value;
                                if (lineRenderHolder == null) {
                                    lineRenderHolder = GameObject.new("LineRender_Holder");
                                }
                                let finalRender = null;
                                let nl = false;
                                for (let line of linePool) {
                                    if (finalRender != null) continue;
                                    const lineObj = line.method("get_gameObject").invoke();
                                    if (lineObj.method("get_activeInHierarchy").invoke() == false) {
                                        lineObj.method("SetActive").invoke(true);
                                        finalRender = line;
                                        break;
                                    }
                                }
                                if (finalRender == null) {
                                    nl = true;
                                    const lineHolder = GameObject.new("LineObject");
                                    getTransform(lineHolder).method("set_parent").invoke(getTransform(lineRenderHolder));
                                    const newLine = addComponent(lineHolder, LineRenderer);
                                    const shader = Shader.method("Find").overload("System.String").invoke(Il2Cpp.string("GUI/Text Shader"));
                                    newLine.method("get_material").invoke().method("set_shader").invoke(shader);
                                    newLine.method("set_startWidth").invoke(0.025);
                                    newLine.method("set_endWidth").invoke(0.025);
                                    newLine.method("get_gameObject").invoke().method("SetActive").invoke(true);
                                    newLine.method("set_useWorldSpace").invoke(true);
                                    newLine.method("get_gameObject").invoke().method("set_layer").invoke(lineRenderHolder.method("get_layer").invoke());
                                    linePool.push(newLine);
                                    finalRender = newLine;
                                }
                                finalRender.method("set_startColor").invoke(color);
                                finalRender.method("set_endColor").invoke(color);
                                finalRender.method("SetPosition").invoke(0, rhp);
                                if (frameCount % 6 == 0)
                                    finalRender.method("SetPosition").invoke(1, getTransform(playerRig).method("get_position").invoke());
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Puts tracers on your right hand. Shows everyone."
            }),
            new ButtonInfo({
                buttonText: "Nearest Tracer",
                disableMethod: () => {
                    for (let line of linePool) {
                        line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                    }
                },
                method: () => {
                    if (frameCount % 5 != 0) {
                        let lowestDistance = Number.MAX_SAFE_INTEGER;
                        let closest = 0;
                        for (let line of linePool) {
                            line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                        }
                        const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                        const vrrigtotal = vrrigs.method("get_Count").invoke();
                        const rigs = [];
                        for (let i = 0; i < vrrigtotal; i++) {
                            const playerRig = vrrigs.method("get_Item").invoke(i);
                            rigs.push(playerRig);
                            if (playerIsLocal(playerRig)) continue;
                            const dist = Vector3.method("Distance").invoke(getTransform(headCollider).method("get_position").invoke(), getTransform(playerRig).method("get_position").invoke());
                            if (lowestDistance > dist) {
                                lowestDistance = dist;
                                closest = i;
                            }
                        }
                        for (let i = 0; i < vrrigtotal; i++) {
                            if (i != closest) continue;
                            const playerRig = rigs[i];
                            if (!playerIsLocal(playerRig)) {
                                const color = playerRig.field("playerColor").value;
                                if (lineRenderHolder == null) {
                                    lineRenderHolder = GameObject.new("LineRender_Holder");
                                }
                                let finalRender = null;
                                let nl = false;
                                for (let line of linePool) {
                                    if (finalRender != null) continue;
                                    if (line.method("get_gameObject").invoke().method("get_activeInHierarchy").invoke() == false) {
                                        line.method("get_gameObject").invoke().method("SetActive").invoke(true);
                                        finalRender = line;
                                        break;
                                    }
                                }
                                if (finalRender == null) {
                                    nl = true;
                                    const lineHolder = GameObject.new("LineObject");
                                    getTransform(lineHolder).method("set_parent").invoke(getTransform(lineRenderHolder));
                                    const newLine = addComponent(lineHolder, LineRenderer);
                                    const shader = Shader.method("Find").overload("System.String").invoke(Il2Cpp.string("GUI/Text Shader"));
                                    newLine.method("get_material").invoke().method("set_shader").invoke(shader);
                                    newLine.method("set_startWidth").invoke(0.025);
                                    newLine.method("set_endWidth").invoke(0.025);
                                    newLine.method("get_gameObject").invoke().method("SetActive").invoke(true);
                                    newLine.method("set_useWorldSpace").invoke(true);
                                    newLine.method("get_gameObject").invoke().method("set_layer").invoke(lineRenderHolder.method("get_layer").invoke());
                                    linePool.push(newLine);
                                    finalRender = newLine;
                                }
                                finalRender.method("set_startColor").invoke(color);
                                finalRender.method("set_endColor").invoke(color);
                                finalRender.method("SetPosition").invoke(1, getTransform(playerRig).method("get_position").invoke());
                                finalRender.method("SetPosition").invoke(0, rightHandTransform.method("get_position").invoke());
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Puts tracers on your right hand. Shows only the nearest player to reduce lag."
            }),
            
            new ButtonInfo({
                buttonText: "Casual Cube ESP",
                disableMethod: () => {
                    for (let line of linePool) {
                        Destroy(line.method("get_gameObject").invoke());
                    }
                    linePool = [];
                },
                method: () => {
                    if (frameCount % 3 == 0) {
                        for (let line of linePool) {
                            line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                        }
                        const rhp = rightHandTransform.method("get_position").invoke();
                        const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                        const vrrigtotal = vrrigs.method("get_Count").invoke();
                        for (let i = 0; i < vrrigtotal; i++) {
                            const playerRig = vrrigs.method("get_Item").invoke(i);
                            if (!playerIsLocal(playerRig)) {
                                const color = playerRig.field("playerColor").value;
                                if (lineRenderHolder == null) {
                                    lineRenderHolder = GameObject.new("LineRender_Holder");
                                }
                                let finalRender = null;
                                let nl = false;
                                for (let line of linePool) {
                                    if (finalRender != null) continue;
                                    const lineObj = line;
                                    if (lineObj.method("get_activeInHierarchy").invoke() == false) {
                                        lineObj.method("SetActive").invoke(true);
                                        finalRender = line;
                                        break;
                                    }
                                }
                                if (finalRender == null) {
                                    nl = true;
                                    const lineHolder = GameObject.method("CreatePrimitive").invoke(3);
                                    getTransform(lineHolder).method("set_parent").invoke(getTransform(lineRenderHolder));
                                    Destroy(getComponent(lineHolder, BoxCollider));
                                    getTransform(lineHolder).method("set_localScale").invoke([0.2, 0.2, 0.2]);
                                    const shader = Shader.method("Find").overload("System.String").invoke(Il2Cpp.string("GUI/Text Shader"));
                                    getComponent(lineHolder, Renderer).method("get_material").invoke().method("set_shader").invoke(shader);
                                    if (!espCollide)
                                        Destroy(getComponent(lineHolder, BoxCollider));
                                    linePool.push(lineHolder);
                                    finalRender = lineHolder;
                                }
                                getComponent(finalRender, Renderer).method("get_material").invoke().method("set_color").invoke(color);
                                getTransform(finalRender).method("set_position").invoke(getTransform(playerRig).method("get_position").invoke());
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Puts cubes on everyone."
            }),
            
            new ButtonInfo({
                buttonText: "Casual Cuboid ESP",
                disableMethod: () => {
                    for (let line of linePool) {
                        Destroy(line.method("get_gameObject").invoke());
                    }
                    linePool = [];
                },
                method: () => {
                    if (frameCount % 3 == 0) {
                        for (let line of linePool) {
                            line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                        }
                        const rhp = rightHandTransform.method("get_position").invoke();
                        const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                        const vrrigtotal = vrrigs.method("get_Count").invoke();
                        for (let i = 0; i < vrrigtotal; i++) {
                            const playerRig = vrrigs.method("get_Item").invoke(i);
                            if (!playerIsLocal(playerRig)) {
                                const color = playerRig.field("playerColor").value;
                                if (lineRenderHolder == null) {
                                    lineRenderHolder = GameObject.new("LineRender_Holder");
                                }
                                let finalRender = null;
                                let nl = false;
                                for (let line of linePool) {
                                    if (finalRender != null) continue;
                                    const lineObj = line;
                                    if (lineObj.method("get_activeInHierarchy").invoke() == false) {
                                        lineObj.method("SetActive").invoke(true);
                                        finalRender = line;
                                        break;
                                    }
                                }
                                if (finalRender == null) {
                                    nl = true;
                                    const lineHolder = GameObject.method("CreatePrimitive").invoke(3);
                                    getTransform(lineHolder).method("set_parent").invoke(getTransform(lineRenderHolder));
                                    Destroy(getComponent(lineHolder, BoxCollider));
                                    getTransform(lineHolder).method("set_localScale").invoke([0.2, 0.4, 0.2]);
                                    const shader = Shader.method("Find").overload("System.String").invoke(Il2Cpp.string("GUI/Text Shader"));
                                    getComponent(lineHolder, Renderer).method("get_material").invoke().method("set_shader").invoke(shader);
                                    if (!espCollide)
                                        Destroy(getComponent(lineHolder, BoxCollider));
                                    linePool.push(lineHolder);
                                    finalRender = lineHolder;
                                }
                                getComponent(finalRender, Renderer).method("get_material").invoke().method("set_color").invoke(color);
                                getTransform(finalRender).method("set_position").invoke(getTransform(playerRig).method("get_position").invoke());
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Puts cuboids on everyone."
            }),
            
            new ButtonInfo({
                buttonText: "Casual Sphere ESP",
                disableMethod: () => {
                    for (let line of linePool) {
                        Destroy(line.method("get_gameObject").invoke());
                    }
                    linePool = [];
                },
                method: () => {
                    if (frameCount % 3 == 0) {
                        for (let line of linePool) {
                            line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                        }
                        const rhp = rightHandTransform.method("get_position").invoke();
                        const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                        const vrrigtotal = vrrigs.method("get_Count").invoke();
                        for (let i = 0; i < vrrigtotal; i++) {
                            const playerRig = vrrigs.method("get_Item").invoke(i);
                            if (!playerIsLocal(playerRig)) {
                                const color = playerRig.field("playerColor").value;
                                if (lineRenderHolder == null) {
                                    lineRenderHolder = GameObject.new("LineRender_Holder");
                                }
                                let finalRender = null;
                                let nl = false;
                                for (let line of linePool) {
                                    if (finalRender != null) continue;
                                    const lineObj = line;
                                    if (lineObj.method("get_activeInHierarchy").invoke() == false) {
                                        lineObj.method("SetActive").invoke(true);
                                        finalRender = line;
                                        break;
                                    }
                                }
                                if (finalRender == null) {
                                    nl = true;
                                    const lineHolder = GameObject.method("CreatePrimitive").invoke(0);
                                    getTransform(lineHolder).method("set_parent").invoke(getTransform(lineRenderHolder));
                                    Destroy(getComponent(lineHolder, BoxCollider));
                                    getTransform(lineHolder).method("set_localScale").invoke([0.2, 0.2, 0.2]);
                                    const shader = Shader.method("Find").overload("System.String").invoke(Il2Cpp.string("GUI/Text Shader"));
                                    getComponent(lineHolder, Renderer).method("get_material").invoke().method("set_shader").invoke(shader);
                                    if (!espCollide)
                                        Destroy(getComponent(lineHolder, SphereCollider));
                                    linePool.push(lineHolder);
                                    finalRender = lineHolder;
                                }
                                getComponent(finalRender, Renderer).method("get_material").invoke().method("set_color").invoke(color);
                                getTransform(finalRender).method("set_position").invoke(getTransform(playerRig).method("get_position").invoke());
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Puts spheres on everyone."
            }),
            
            new ButtonInfo({
                buttonText: "Casual Capsule ESP",
                disableMethod: () => {
                    for (let line of linePool) {
                        Destroy(line.method("get_gameObject").invoke());
                    }
                    linePool = [];
                },
                method: () => {
                    if (frameCount % 3 == 0) {
                        for (let line of linePool) {
                            line.method("get_gameObject").invoke().method("SetActive").invoke(false);
                        }
                        const rhp = rightHandTransform.method("get_position").invoke();
                        const vrrigs = NetPlayerClass.field("_spawnedPlayers").value;
                        const vrrigtotal = vrrigs.method("get_Count").invoke();
                        for (let i = 0; i < vrrigtotal; i++) {
                            const playerRig = vrrigs.method("get_Item").invoke(i);
                            if (!playerIsLocal(playerRig)) {
                                const color = playerRig.field("playerColor").value;
                                if (lineRenderHolder == null) {
                                    lineRenderHolder = GameObject.new("LineRender_Holder");
                                }
                                let finalRender = null;
                                let nl = false;
                                for (let line of linePool) {
                                    if (finalRender != null) continue;
                                    const lineObj = line;
                                    if (lineObj.method("get_activeInHierarchy").invoke() == false) {
                                        lineObj.method("SetActive").invoke(true);
                                        finalRender = line;
                                        break;
                                    }
                                }
                                if (finalRender == null) {
                                    nl = true;
                                    const lineHolder = GameObject.method("CreatePrimitive").invoke(1);
                                    getTransform(lineHolder).method("set_parent").invoke(getTransform(lineRenderHolder));
                                    Destroy(getComponent(lineHolder, BoxCollider));
                                    getTransform(lineHolder).method("set_localScale").invoke([0.27, 0.4, 0.27]);
                                    const shader = Shader.method("Find").overload("System.String").invoke(Il2Cpp.string("GUI/Text Shader"));
                                    getComponent(lineHolder, Renderer).method("get_material").invoke().method("set_shader").invoke(shader);
                                    if (!espCollide)
                                        Destroy(getComponent(lineHolder, CapsuleCollider));
                                    linePool.push(lineHolder);
                                    finalRender = lineHolder;
                                }
                                getComponent(finalRender, Renderer).method("get_material").invoke().method("set_color").invoke(color);
                                getTransform(finalRender).method("set_position").invoke(getTransform(playerRig).method("get_position").invoke());
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Puts capsules on everyone."
            }),
        ],
        [ // Overpowered Mods [9]
            new ButtonInfo({
                buttonText: "Exit Overpowered Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),

            /* when i find a method to lag then maybe
            new ButtonInfo({
                buttonText: "Lag Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const ray = gunData.ray;

                        if (rightTrigger) {
                            const gunTarget = getComponentInParent(ray.method("get_collider").invoke(), VRRig);
                            if (gunTarget && !gunTarget.handle.isNull() && time > lagGunDelay) {
                                if (!playerIsLocal(gunTarget)) {
                                    lagGunDelay = time + 2;

                                    const plRef = gunTarget.method("get_Creator").invoke().method("get_ActorNumber"GetPlayerRef").invoke();
                                    const arr = Il2Cpp.array(SystemObject, 0);
                                    const rpc = FriendshipGroupDetection.field("photonView").value.method("RPC");
                                    for (let i = 0; i < 425; i++) {
                                        rpc.invoke(Il2Cpp.string("NotifyPartyMerging"), plRef, arr);
                                    }
                                    sendAllOutgoing();
                                }
                            }
                        }
                    }
                },
                isTogglable: true,
                toolTip: "Lags whoever your hand desires. May be broken."
            }), */ 
        ],
        [ // Safety Mods [10]
            new ButtonInfo({
                buttonText: "Exit Safety Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),

            /* i could make this check for user ids of moderators
            new ButtonInfo({
                buttonText: "Anti Moderator",
                isTogglable: true,
                method: () => {
                    if (frameCount % 5 != 0) {
                        const vrrigs = GorillaParent.field("vrrigs").value;
                        const vrrigtotal = vrrigs.method("get_Count").invoke();
                        let shouldLeave = false;
                        for (let i = 0; i < vrrigtotal; i++) {
                            const playerRig = vrrigs.method("get_Item").invoke(i);
                            if (playerIsLocal(playerRig)) continue;
                            const concat = String(playerRig.field("concatStringOfCosmeticsAllowed").value);
                            if (concat.includes("LBAAD.")) { shouldLeave = true; break; }; // Admin
                            if (concat.includes("LBAAK.")) { shouldLeave = true; break; }; // Stick
                            if (concat.includes("LMAPY.")) { shouldLeave = true; break; }; // Forest Guide
                        }
                        if (shouldLeave == true) {
                            let room = "";
                            try {
                                room = String(PhotonNetwork.method("get_CurrentRoom").invoke().method("get_Name").invoke());
                            } finally {
                                NetworkSystem.method("ReturnToSinglePlayer").invoke();
                            }
                            for (let i = 0; i < 10; i++) {
                                console.log("Moderator in code " + room);
                            }
                            sendNotification("Moderator in code " + room, true, 20);
                        }
                    }
                },
                toolTip: "When someone with the stick joins, you get disconnected.",
            }),
            */
        ],

        [ // Favorite Mods [11]
            new ButtonInfo({
                buttonText: "Exit Favorite Mods",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
        ],
        
        [ // Enabled Mods [12]
            new ButtonInfo({
                buttonText: "Exit Enabled Mods",
                method: () => {                    
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
        ]
    ];

    let buttonMap: Map<string, ButtonInfo> = new Map();
    buttons.flat().forEach(button => {
        buttonMap.set(button.buttonText, button);
    });

    function getIndex(buttonText: string): ButtonInfo {
        return buttonMap.get(buttonText);
    }
    function getCategoryIndex(button: ButtonInfo): number {
        let ret = null;
        buttons.forEach((category, categoryIndex) => {
            category.forEach(categoryButton => {
                if (button == categoryButton) {
                    ret = categoryIndex;
                }
            });
        });
        return ret;
    }

    const ButtonActivation = GorillaReportButton.method("OnTriggerEnter");
    ButtonActivation.implementation = function (collider) {
        const rawName = this.method("get_name").invoke().toString();

        if (rawName.length > 1 && rawName[1] == "@") {
            if (collider.handle.equals(referenceCollider.handle)) {
                const goName = rawName.substring(2, rawName.length - 1);
                const _time = Time.method("get_time").invoke();

                if (_time > buttonClickDelay) {
                    buttonClickDelay = _time + 0.2;

                    const button = getIndex(goName)
                    playButtonSound();
                    if (button) {
                        if (leftGrab) {
                            toggleFavorite(button);
                            reloadMenu();
                        } else {
                            if (button.isTogglable) {
                                button.enabled = !button.enabled;

                                reloadMenu();
                                if (button?.enabled) {
                                    if (button.toolTip && buttonNotifications)
                                        sendNotification("<color=grey>[</color><color=green>ENABLE</color><color=grey>]</color> " + button.toolTip, false);
                                    button.enableMethod?.();
                                } else {
                                    if (button.toolTip && buttonNotifications)
                                        sendNotification("<color=grey>[</color><color=red>DISABLE</color><color=grey>]</color> " + button.toolTip, false);
                                    button?.disableMethod?.();
                                }

                            } else {
                                reloadMenu();
                                if (button.toolTip && buttonNotifications)
                                    sendNotification("<color=grey>[</color><color=green>ENABLE</color><color=grey>]</color> " + button.toolTip, false);
                                button?.method?.();
                            }
                            if (getCategoryIndex(button) == 12 && !enabledRecent)
                                loadEnabled();
                        }
                    }
                }
            }

            return;
        }

        return this.method("OnTriggerEnter").invoke(collider);
    };

    /* 
    const VRRigOnDisable = VRRig.method("OnDisable");
    VRRigOnDisable.implementation = function () {
        if (this.handle.equals(LocalRig.handle)) {
            return;
        }

        return this.method("OnDisable").invoke();
    };

    const SendReport = MonkeAgent.method("SendReport");
    SendReport.implementation = function () {
        return;
    }
    */ 

    // Custom boards | idk man 
    /*
    {
        let boardIndex = 0;
        const forest = getTransform(getObject("Environment Objects/LocalObjects_Prefab/TreeRoom"));
        const childCount = forest.method("get_childCount").invoke();

        for (let i = 0; i < childCount; i++) {
            const child = forest.method("GetChild").invoke(i);
            const gameObject = child.method("get_gameObject").invoke();
            if (gameObject.method("get_name").invoke().toString().includes("UnityTempFile")) {
                boardIndex++;
                if (boardIndex == 6) {
                    boardMaterial = Material.new();
                    Material.method("CreateWithShader").invoke(boardMaterial, UberShader);

                    getComponent(gameObject, Renderer).method("set_material").invoke(boardMaterial);
                    boardMaterial.method("set_color").invoke(bgColor);
                    break;
                }
            }
        }

        let modCount = 0;
        buttons.forEach((category, categoryIndex) => {
            if (categoryIndex == 12) {
                modCount += 1;
            } else {
                modCount += category.length;
            }
        }); 

        const motdTitle = getComponent(getObject("Environment Objects/LocalObjects_Prefab/TreeRoom/motdHeadingText"), TextMeshPro);
        motdTitle.method("set_text").invoke(Il2Cpp.string("Thanks for using ii's Stupid Menu!"));

        const motdText = getComponent(getObject("Environment Objects/LocalObjects_Prefab/TreeRoom/motdBodyText"), TextMeshPro);
        motdText.method("set_fontSize").invoke(100);
        motdText.method("set_text").invoke(Il2Cpp.string(
`You are currently using build ${version}. This menu was created by iiDk (@crimsoncauldron) on Discord. There are a total of <b>${modCount}</b> mods on this menu. This menu runs completely standalone. <color=red>I, iiDk, am not responsible for any bans using this menu.</color> If you get banned while using this, it's your responsibility.`
));
    }
    */

    // for some reason lateupdate got like removed/hidden???
    const LateUpdate = GTPlayer.method("FixedUpdate");

    LateUpdate.implementation = function () {
        /*
        leftPrimary = ControllerInputPoller.field("leftControllerPrimaryButton").value;
        leftSecondary = ControllerInputPoller.field("leftControllerSecondaryButton").value;

        rightPrimary = ControllerInputPoller.field("rightControllerPrimaryButton").value;
        rightSecondary = ControllerInputPoller.field("rightControllerSecondaryButton").value;

        leftGrab = ControllerInputPoller.field("leftGrab").value;
        rightGrab = ControllerInputPoller.field("rightGrab").value;

        leftTrigger = ControllerInputPoller.field("leftControllerIndexFloat").value > 0.5;
        rightTrigger = ControllerInputPoller.field("rightControllerIndexFloat").value > 0.5;
        */

        // this is such a bad way to do it but hey this is how i did it with my first menu

        if (PCEnabled) {
            const kb = Keyboard.method("get_current").invoke()

            rightPrimary = kb.method("get_eKey").invoke().method("get_isPressed").invoke();
            rightSecondary = kb.method("get_rKey").invoke().method("get_isPressed").invoke();
            leftPrimary = kb.method("get_fKey").invoke().method("get_isPressed").invoke();
            leftSecondary = kb.method("get_gKey").invoke().method("get_isPressed").invoke();
            leftGrab = kb.method("get_leftBracketKey").invoke().method("get_isPressed").invoke();
            rightGrab = kb.method("get_rightBracketKey").invoke().method("get_isPressed").invoke();
            leftTrigger = kb.method("get_equalsKey").invoke().method("get_isPressed").invoke();
            rightTrigger = kb.method("get_minusKey").invoke().method("get_isPressed").invoke();
        } else {
            const leftDevice = InputDevices.method("GetDeviceAtXRNode", 1).invoke(4);
            const rightDevice = InputDevices.method("GetDeviceAtXRNode", 1).invoke(5);
            
            const outBool = Il2Cpp.alloc(1);
            const outAxis = Il2Cpp.alloc(8);
            leftDevice.method("TryGetFeatureValue", 2).invoke(CommonUsages.field("primaryButton").value, outBool);
            leftPrimary = outBool.readU8() !== 0;

            leftDevice.method("TryGetFeatureValue", 2).invoke(CommonUsages.field("secondaryButton").value, outBool);
            leftSecondary = outBool.readU8() !== 0;

            leftDevice.method("TryGetFeatureValue", 2).invoke(CommonUsages.field("gripButton").value, outBool);
            leftGrab = outBool.readU8() !== 0;

            leftDevice.method("TryGetFeatureValue", 2).invoke(CommonUsages.field("triggerButton").value, outBool);
            leftTrigger = outBool.readU8() !== 0; 

            rightDevice.method("TryGetFeatureValue", 2).invoke(CommonUsages.field("primaryButton").value, outBool);
            rightPrimary = outBool.readU8() !== 0;

            rightDevice.method("TryGetFeatureValue", 2).invoke(CommonUsages.field("secondaryButton").value, outBool);
            rightSecondary = outBool.readU8() !== 0;

            rightDevice.method("TryGetFeatureValue", 2).invoke(CommonUsages.field("triggerButton").value, outBool);
            rightTrigger = outBool.readU8() !== 0;

            rightDevice.method("TryGetFeatureValue", 2).invoke(CommonUsages.field("gripButton").value, outBool);
            rightGrab = outBool.readU8() !== 0;
        }

        deltaTime = Time.method("get_deltaTime").invoke();
        time = Time.method("get_time").invoke();
        frameCount++;

        if ((righthand && rightSecondary) || (!righthand && leftSecondary) || (menuKey)) {
            if (currentNotification != "" && time > notifactionResetTime)
                reloadMenu();

            if (menu == null) {
                renderMenu();
            } else {
                recenterMenu();
            }
        } else {
            if (menu != null) {
                Destroy(menu);
                menu = null;
            }
        }

        if (menu == null) {
            if (reference != null) {
                Destroy(reference);
                reference = null;
            }
        } else {
            if (reference == null) {
                renderReference();
            }
        }

        try {
            if (GunPointer != null) {
                if (!(GunPointer.method("get_activeSelf").invoke())) {
                    Destroy(GunPointer);
                    GunPointer = null;
                }
                else
                    GunPointer.method("SetActive").invoke(false);
            }

            let lineObj = GunLine.method("get_gameObject").invoke();
            if (lineObj != null) {
                if (!(lineObj.method("get_activeSelf").invoke())) {
                    Destroy(lineObj);
                    GunLine = null;
                }
                else
                    lineObj.method("SetActive").invoke(false);
            }
        } catch { }

        if (PCEnabled) {
            flatButtons = buttons[currentCategory]
            .slice(currentPage * 8)
            .slice(0, 8);
            
            const kb = Keyboard.method("get_current").invoke();
            const upPressed = kb.method("get_upArrowKey").invoke().method("get_isPressed").invoke() == true;
            const downPressed = kb.method("get_downArrowKey").invoke().method("get_isPressed").invoke() == true;
            const rightPressed = kb.method("get_rightArrowKey").invoke().method("get_isPressed").invoke() == true;
            const leftPressed = kb.method("get_leftArrowKey").invoke().method("get_isPressed").invoke() == true;
            const enterPressed = kb.method("get_enterKey").invoke().method("get_isPressed").invoke() == true;
            menuKey = kb.method("get_qKey").invoke().method("get_isPressed").invoke() == true;

            if (upPressed && !prevUp) {
                selectedButtonIndex = Math.max(0, selectedButtonIndex - 1);
                reloadMenu();
            }
            if (downPressed && !prevDown) {
                selectedButtonIndex = Math.min(flatButtons.length - 1, selectedButtonIndex + 1);
                reloadMenu();
            }
            if (rightPressed && !prevRight) {
                const lastPage = Math.ceil(buttons[currentCategory].length / 8) - 1;

                currentPage++;
                currentPage %= lastPage + 1;

                selectedButtonIndex = 0;
                reloadMenu();
            }
            if (leftPressed && !prevLeft) {
                const lastPage = Math.ceil(buttons[currentCategory].length / 8) - 1;

                currentPage--;
                if (currentPage < 0)
                    currentPage = lastPage;
                selectedButtonIndex = 0;
                reloadMenu();
            }
            if (enterPressed && !prevReturn) {
                const btn = flatButtons[selectedButtonIndex];
                if (btn) {
                    if (btn.isTogglable) {
                        btn.enabled = !btn.enabled;
                        btn.enabled ? btn.enableMethod?.() : btn.disableMethod?.();
                    } else {
                        btn.method?.();
                    }
                    reloadMenu();
                }
            }

            prevUp = upPressed;
            prevDown = downPressed;
            prevRight = rightPressed;
            prevLeft = leftPressed;
            prevReturn = enterPressed;
        }

        buttons.flat()
            .filter(button => button.enabled)
            .forEach(button => {
                if (button.method) {
                    try {
                        button.method();
                    } catch (error) {
                        console.error(`Error executing method for button '${button.buttonText || 'unnamed'}':`, error);
                        console.error('Error stack:', error.stack);
                        console.error('Button object:', button);

                        if (error.stack) {
                            const stackLines = error.stack.split('\n');
                            if (stackLines.length > 1) {
                                console.error('Error occurred at:', stackLines[1].trim());
                            }
                        }
                    }
                }
            });

        return LateUpdate.invoke();
    };

    // other hooks
    {
        const RPCTeleport = NetPlayerClass.method("RPC_Teleport")
        RPCTeleport.implementation = function () {
            return;
        }
    }

    console.log(`

     ••╹   ┏┓     • ┓  ┳┳┓      
     ┓┓ ┏  ┗┓╋┓┏┏┓┓┏┫  ┃┃┃┏┓┏┓┓┏
     ┗┗ ┛  ┗┛┗┗┻┣┛┗┗┻  ┛ ┗┗ ┛┗┗┻
                ┛               
    ii's Stupid Menu Quest ${version}
    Compiled ${new Date().toISOString()}
`);
}, "main" /* main thread to fix breakpoint reached errors */);
